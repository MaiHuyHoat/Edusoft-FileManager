/*
 Copyright (c) 2007-2016, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://cksource.com/ckfinder/license
 */

var config = {
	filebrowserBrowseUrl: 'lib/editor/ckfinder/ckfinder.html',
    filebrowserUploadUrl: 'lib/editor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images'
};
config.defaultDisplayDate = false;
config.skin = 'neko';
//config.language = 'en';
// Set your configuration options below.

// Examples:
//config.language = 'en';
// config.skin = 'jquery-mobile';

CKFinder.define( config );
