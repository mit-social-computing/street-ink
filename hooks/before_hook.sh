#!/usr/bin/env bash

export GEM_HOME=$build_dir/.gem/ruby/1.9.1
PATH="$GEM_HOME/bin:$PATH"
if test -d $cache_dir/ruby/.gem; then
  status "Restoring ruby gems directory from cache"
  cp -r $cache_dir/ruby/.gem $build_dir
  HOME=$build_dir gem update compass --user-install --no-rdoc --no-ri
else
  HOME=$build_dir gem install compass --user-install --no-rdoc --no-ri
fi

# Cache for Ruby
rm -rf $cache_dir/ruby
mkdir -p $cache_dir/ruby

# If app has a gems directory, cache it.
if test -d $build_dir/.gem; then
  status "Caching ruby gems directory for future builds"
  cp -r $build_dir/.gem $cache_dir/ruby
fi
