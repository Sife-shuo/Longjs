class Long{
    constructor(){
        if(!arguments[0]){
            throw "Error arguments"
        }
        if(arguments[0].int&&arguments[0].float){
            this.int=arguments[0].int;
            this.float=arguments[0].float;
        }else if(Object.prototype.toString.call(arguments[0]).slice(8,-1)=="String"){
            this.int=arguments[0].split(".")[0].split("").filter(e=>"0123456789".includes(e)).map(i=>Number(i))
            if(arguments[0].split(".").length==2){
                this.float=arguments[0].split(".")[1].split("").filter(e=>"0123456789".includes(e)).map(i=>Number(i))
            }else{
                this.float=[]
            }
        }
        this._self=function(value,type){
            if(type=="add"){
                var enter=0;
                var int=Array.from(this.int);
                var float=Array.from(this.float);
                var len=value.float.length;
                var len0=float.length;
                if(len>len0){for(var i=0;i<len-len0;i++){float.push(0)}}
                value.float.reverse().map((en,p)=>{
                    var e=en;
                    if(!en){e=0}
                    var over=float[len-p-1]+e+enter;
                    if(over>=10){
                        float[len-p-1]=over%10;
                        enter=(over-over%10)/10;
                    }else{
                        float[len-p-1]=over;
                        enter=0;
                    }
                });
                var len=value.int.length;
                var len0=int.length;
                if(len>len0){for(var i=0;i<len-len0;i++){int.push(0)}}
                int=int.reverse();
                value.int.reverse().map((en,p)=>{
                    var e=en;
                    if(!en){e=0}
                    var over=int[len-p-1]+e+enter;
                    if(over>=10){
                        int[len-p-1]=over%10;
                        enter=(over-over%10)/10;
                    }else{
                        int[len-p-1]=over;
                        enter=0;
                    }
                });
                if(enter!=0){
                    int.unshift(enter);
                    enter=0;
                }
                return {int:int.reverse(),float:float,_self:this._self}
            }
        }
        return this;
    }
    add(...num){
        var f=Object.assign({},this);
        num.map(l=>{
            f=f._self(l.int&&l.float?l:new Long(l),"add")
        });
        return new Long(f);
    }
    toString(){
        var res="";
        res+=this.int.join("");
        if(this.float.length){
            res+=".";
            res+=this.float.join("");
        }
        return res;
    }
    toNumber(){return Number(this.toString())}
}