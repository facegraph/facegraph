# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Memories::Application.initialize!

# Initizlie memcached
# require 'memcache'
# CACHE = MemCache.new('127.0.0.1')
require 'dalli'
CACHE = Dalli::Client.new('localhost:11211')

# Enable newrelic for production server
#configure :production do
#    require 'newrelic_rpm'
#end