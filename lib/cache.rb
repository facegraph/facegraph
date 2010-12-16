module Cache
  def self.get(key)
    CACHE.get(key)
  end

  def self.set(key, val)
    CACHE.set(key, val)
  end
end