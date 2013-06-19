var util = require('util');
var assert = require('assert');
var logger = require('winston');
var fs = require('fs');
var defineClass = require('library/class/defineClass.js');
var Class = require('library/class/Class.js');

var IllegalArgumentException = require('library/lucene/util/IllegalArgumentException.js');
/**
Instances of the file descriptor class serve as an opaque handle to the underlying machine-specific structure representing an open file, an open socket, or another source or sink of bytes. The main practical use for a file descriptor is to create a FileInputStream or FileOutputStream to contain it.

Applications should not create their own file descriptors.
**/
var FileDescriptor = defineClass({
	name : "FileDescriptor",
	
	/**
	  construct with a file descriptor value
	**/
	construct : function(fd){
		if(isNaN(fd)) throw new IllegalArgumentException("invalid fd");
		
		//the file descriptor number
		this.fd = fd;
	},
	
	methods : {
		
		/**
		Tests if this file descriptor object is valid.
		**/
		valid : function(){
			var stat = fd.fstatSync(this.fd);
			return (stat.isFile() || stat.isDirectory() || stat.isBlockDevice() || stat.isCharacterDevice() || stat.isFIFO() || stat.isSocket());
		},
		
		/**
		
		Force all system buffers to synchronize with the underlying device. This method returns after all modified data and attributes of this FileDescriptor have been written to the relevant device(s). In particular, if this FileDescriptor refers to a physical storage medium, such as a file in a file system, sync will not return until all in-memory modified copies of buffers associated with this FileDescriptor have been written to the physical medium. sync is meant to be used by code that requires physical storage (such as a file) to be in a known state For example, a class that provided a simple transaction facility might use sync to ensure that all changes to a file caused by a given transaction were recorded on a storage medium. sync only affects buffers downstream of this FileDescriptor. If any in-memory buffering is being done by the application (for example, by a BufferedOutputStream object), those buffers must be flushed into the FileDescriptor (for example, by invoking OutputStream.flush) before that data will be affected by sync.
		
		@throw SyncFailedException - Thrown when the buffers cannot be flushed, or because the system cannot guarantee that all the buffers have been synchronized with physical media.
		**/
		sync : function(){
			try{
				fs.fsyncSync(this.fd);
			}catch(e){
				logger.warn("file sync failed for fd=" + this.fd);
			}
		}
			
	}
});




module.exports = exports = FileDescriptor;