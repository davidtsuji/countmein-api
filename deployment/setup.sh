#!/bin/bash
set -e
set -v

##
#
# Modified from https://github.com/garrows/noleg-stack
#
##

DOMAIN=countmein.io

sudo apt-get update

# Install git, nginx, mongo, nodejs, forever and express
sudo apt-get install -y nginx
sudo nginx

sudo apt-get install -y git

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install -y mongodb-10gen

sudo apt-get install -y python-software-properties python g++ make
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install -y nodejs

# For phantomjs (https://github.com/ariya/phantomjs/issues/10904)
sudo apt-get install -y libfontconfig

sudo npm install -g forever express

cd /tmp
git clone https://github.com/davidtsuji/countmein.io.git

# Create users for git and nodejs
sudo adduser --shell $(which git-shell) --gecos 'git version control' --disabled-password git
sudo usermod -a -G www-data git
sudo chsh -s /usr/bin/git-shell git

sudo adduser --gecos 'node daemon user' --disabled-password node-user
sudo usermod -a -G www-data node-user
sudo usermod -a -G git node-user


# Add ubuntu's user to the authorized keys for git
sudo mkdir -p /home/git/.ssh
sudo touch /home/git/.ssh/authorized_keys
sudo chmod 600 /home/git/.ssh/authorized_keys
sudo chmod 700 /home/git/.ssh
sudo chown -R git:git /home/git/

cat /root/.ssh/authorized_keys | sudo tee -a /home/git/.ssh/authorized_keys

ssh-keygen -t rsa -N '' -f /root/.ssh/id_rsa
cat /root/.ssh/id_rsa.pub | sudo tee -a /home/git/.ssh/authorized_keys


# Setup git server
sudo mkdir -p /opt/git/countmein.git
cd /opt/git/countmein.git
sudo git --bare init

sudo chown -R git:www-data /opt/git/countmein.git


# Setup publish directories for node sites
sudo mkdir -p /var/www
sudo chgrp -R www-data /var/www
sudo chmod -R g+w /var/www


# Get git to publish a copy of the repository to /var/www/current every time a commit happens
sudo cp /tmp/countmein.io/deployment/post-receive.sh /opt/git/countmein.git/hooks/post-receive
sudo chmod 755 /opt/git/countmein.git/hooks/post-receive
sudo chown git:www-data /opt/git/countmein.git/hooks/post-receive


# Setup upstart to keep node running after reboots
cp /tmp/countmein.io/deployment/upstart.conf node-www.conf


chmod 777 node-www.conf
sudo mv node-www.conf /etc/init/node-www.conf

# Setup the logging directories
sudo mkdir -p /var/log/node
sudo chown node-user:www-data /var/log/node


# Give the git user account root access so it can restart upstart daemons
echo "git ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/node-restart
sudo chmod 440 /etc/sudoers.d/node-restart


# Configure nginx to direct traffic to the two node processes
cp /tmp/countmein.io/deployment/nginx.conf $DOMAIN

sudo mv $DOMAIN /etc/nginx/sites-available/$DOMAIN

sudo ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/$DOMAIN

sudo service nginx restart
