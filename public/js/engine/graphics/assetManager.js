export default function assetManager() {
    this.successCount = 0;
    this.errorCount = 0;
	this.paths = {};
    this.cache = {};
    this.downloadQueue = [];
}

assetManager.prototype.queueDownload = function(paths) {
	this.paths = paths;
	for(p in paths) this.downloadQueue.push(paths[p]);
};

assetManager.prototype.downloadAll = function(cb) {
	if (this.downloadQueue.length === 0) { log.c("no assets"); cb(); }
	else {
		for(p in this.downloadQueue) {
			var path = this.downloadQueue[p];
			var img = new Image();
			var that = this;

			img.addEventListener("load", function() {
				that.successCount += 1;
				if (that.isDone()) { 
					log.c("%cLoaded Resources!", 'background: #62a691; color: #c9f0e4; padding: 4px;');
					cb(); 
				}
			}, false);
			img.addEventListener("error", function() {
				log.e("error: " + path);
				that.errorCount += 1;
				if (that.isDone()) { cb(); }
			}, false);
			img.src = path;

			for(p in this.paths) { if(this.paths[p] == path) this.cache[p] = img; }
		}
	}
};

assetManager.prototype.isDone = function() { return (this.downloadQueue.length == this.successCount + this.errorCount); };
assetManager.prototype.getAsset = function(path) { return this.cache[path]; };