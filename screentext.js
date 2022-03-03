function ScreenTextService(cursor){
  this.screen_text = {};
  this.cursor = cursor;

  /**
   * [init description]
   * @return {[type]} [description]
   */
  this.init = function(){
    this.screen_text = { 
      '@': '                                ', 
      'A': '                                ', 
      'B': '                                ', 
      'C': '                                ', 
      'D': '                                ', 
      'E': '                                ', 
      'F': '                                ', 
      'G': '                                ', 
      'H': '                                ', 
      'I': '                                ', 
      'J': '                                ', 
      'K': '                                ', 
      'L': '                                ', 
      'M': '                                ', 
      'N': '                                ', 
      'O': '                                '
    };
  };

  function setCharAt(str,index,chr) 
  {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
  }

  /**
   * [copy description]
   * @param  {[type]} screen_text [description]
   * @return {[type]}             [description]
   */
  this.copy = function(screen_text)
  {
    for (var key in screen_text)
	{
      if (screen_text.hasOwnProperty(key))
	  {
	    for(i = 0; i < screen_text[key].length; i++)
		{
		  if (screen_text[key].charAt(i) != ' ')
              this.screen_text[key] = setCharAt(this.screen_text[key], i, screen_text[key].charAt(i) );
		}
      }
	}
    this.cursor.init();
  };


  /**
   * [get description]
   * @return {[type]} [description]
   */
  this.get = function(){
    return this.screen_text;
  };

  /**
   * [getHTML description]
   * @return {[type]} [description]
   */
  this.getHTML = function(){
    if(this.screen_text){
      var converted = {};

      for (var key in this.screen_text)
        if (this.screen_text.hasOwnProperty(key)){
		  var ikey = key;
		  if (key === '@') ikey = 'at';
          converted[ikey] = this.screen_text[key].split(' ').join('&nbsp');
        }

      return converted;
    }
  };

  /**
   * [replaceCharAt description]
   * @param  {[type]} string      [description]
   * @param  {[type]} position    [description]
   * @param  {[type]} replacement [description]
   * @return {[type]}             [description]
   */
  this.replaceCharAt = function(string, position, replacement){
    if(string)
      return string.substr(0, position) + replacement + string.substr(position + 1);
  };

  /**
   * [add description]
   * @param {[type]} text [description]
   */
  this.add = function(text)
  {
    if(this.screen_text['@'] === undefined)
      this.init();
	console.log("JFRD node_modules\\atm-screentext\\screentext.js Line 95 >" + this.screen_text['@'] + "<");

    for(var i = 0; i < text.length; i++)
	{
      var char = text[i];
      var row = this.cursor.getPosition()['y'];
      var column = this.cursor.cursor_position['x'];

      this.screen_text[row] = this.replaceCharAt(this.screen_text[row], column, char);
      this.cursor.move();
    }
  };

  /**
   * [put insert the character and don't move the cursor]
   * @return {[type]} [description]
   */
  this.put = function(text){
    var stored_cursor_position = this.cursor.getPosition();
    this.add(text);
    this.cursor.setPosition(stored_cursor_position['y'] + stored_cursor_position['x']);
  };

    /**
   * [isEmpty description]
   * @return {[type]} [description]
   */
  this.isEmpty = function(){
    for (var key in this.screen_text) {
      if (this.screen_text.hasOwnProperty(key))
        if(this.screen_text[key] !== '                                ')
          return false;
    }
    return true;
  };

  /**
   * [setCursorPosition description]
   * @param {[type]} cursor_position [description]
   */
  this.setCursorPosition = function(cursor_position){
    this.cursor.setPosition(cursor_position['y'] + cursor_position['x']);
  };

};

module.exports = ScreenTextService;