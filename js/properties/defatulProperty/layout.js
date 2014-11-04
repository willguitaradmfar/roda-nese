inject.define("properties.defatulProperty.layout", [function () {
    var self = {};

    var regexXS = /(col-xs-\d{0,2})/;
    var regexLG = /(col-lg-\d{0,2})/;
    var regexSM = /(col-sm-\d{0,2})/;
    var regexMD = /(col-md-\d{0,2})/;

    self.property = {};
    self.property.txt_phones = {
        val : '12',
        category : 'layout',
        update : function (target, val, comp) {            
            var targetRoot = $(target);
            var _class = 'col-xs-'+val;           

            var _classOld = targetRoot.attr('class');

            if(regexXS.test(_classOld)){
                targetRoot.attr('class', _classOld.replace(regexXS, _class));
            }else{            
                targetRoot.addClass(_class);
            }            
            console.debug(targetRoot.attr('class'));
        }
    };

    self.property.txt_bigDesktops = {
        val : '4',
        category : 'layout',
        update : function (target, val, comp) {            
            var targetRoot = $(target);
            var _class = 'col-lg-'+val;            

            var _classOld = targetRoot.attr('class');

            if(regexLG.test(_classOld)){
                targetRoot.attr('class', _classOld.replace(regexLG, _class));
            }else{            
                targetRoot.addClass(_class);
            }

            console.debug(targetRoot.attr('class'));
            
        }
    };

    self.property.txt_tablets = {
        val : '12',
        category : 'layout',
        update : function (target, val, comp) {            
            var targetRoot = $(target);
            var _class = 'col-sm-'+val;            

            var _classOld = targetRoot.attr('class');

            if(regexSM.test(_classOld)){
                targetRoot.attr('class', _classOld.replace(regexSM, _class));
            }else{            
                targetRoot.addClass(_class);
            }

            console.debug(targetRoot.attr('class'));
        }
    };

    self.property.txt_desktops = {
        val : '6',
        category : 'layout',
        update : function (target, val, comp) {            
            var targetRoot = $(target);
            var _class = 'col-md-'+val;            

            var _classOld = targetRoot.attr('class');

            if(regexMD.test(_classOld)){
                targetRoot.attr('class', _classOld.replace(regexMD, _class));
            }else{            
                targetRoot.addClass(_class);
            }

            console.debug(targetRoot.attr('class'));
        }
    };
    
    return self;
}]);