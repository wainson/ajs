

///////////////////////////////////////////////////
// Ajs 是 " All in js "的简称，
// 核心价值将CSS和HTML换一种写法整合在一起，
// 力求简化web应用开发
// 具体实例请移步: https://gitee.com/hank2019
///////////////////////////////////////////////////
/*
MIT License

Copyright (c) 2024 liu wei xian

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/



//@ajs
export class Ajs{
    constructor(){
        this.doc = document;
        if(window.$lg == undefined){
            //new Log();
        }
    }
    
    //#valid
    valid   =   (obj)=>{
        if(obj == undefined || obj == null){
          return 0;
        }
        return 1;
    }
    
    //#invalid
    inValid =   (obj)=>{
        if(this.valid(obj)==0){
          return 1;
        }
        return 0;
    }
    
    
    
    //#docu
    docu    =   {
        ds      :   ()=>{
            return this;
        },
        domain  :   ()=>{
            return document.domain;
        },
        url     :   ()=>{
            return document.URL;
        },
        uri     :   (...args)=>{
            if(args.length == 0)return document.documentURI;
            if(args.length > 0 && args[0].length > 0) {
                document.documentURI = args[0];
                return this;
            }
            
        },
        
        gbid    :   (id)=>{
            //
            return document.getElementById(id);
        },
        gbcl    :   (clazz)=>{
            return document.getElementsByClassName(clazz);
        },
        gbna    :   (name)=>{
            return document.getElementsByTagName(anyStr);
        },
        gbtg    :   (tag)=>{
            return document.getElementsByTagName(tag);
        },
        query   :   (anyStr)=>{
            return document.querySelector(anyStr);
        },
        queryAll:   (anyStr)=>{
            return document.querySelectorAll(anyStr);
        },
        
        /*
        //img-{07}.jpg
        //img-0160.jpg
        //querySetId('#div1 .img','img-','.jpg',0,160,4,'0');
        querySetId : (queStr,modStr,step=1,padChar='0')=>{
            let str    = modStr.toString();
            let hasNum = str.includes('{');
            let bit = 0;
            if(hasNum){
                let mch = str.match(/([.\.]+)\{(\d+)\}([.\.]*)/ig);
                if(mch){
                    let zeros = mch[1].toString();
                    let len = zeros.length;
                }
            }
            let elms = document.querySelectorAll('.tbox .icon');
            let i = numStart;
            for(let elm of elms){
                let ii = numPad > 0 ? i.toString().padStart(numPad,numPadStr) : i;
                elm.setAttribute('id',`${id}${ii}${idEnd}`);
                i++;
            }
              
        },*/
        
        title   :   (...args)=>{
            if(args.length == 0) return document.title;
            if(args.length > 0 && args[0].length > 0) {
                document.title = args[0];
                return this;
            }
        },
        head    :   ()=>{
            return document.head;
        },
        body    :   ()=>{
            return document.body;
        },
        rs      :   ()=>{
            return document.readyState;
        },
        ref     :   ()=>{
            return document.referrer;
        },
        exe     :   {
            copy    : (anyData,showUi=false)=>{
                let rst = document.execCommand("copy",showUi,anyData);
                
                return this;
            },
            cut    : ()=>{
                document.execCommand("cut");
                return this;
            },
            paste    : ()=>{
                document.execCommand("paste");
                return this;
            },
            selectAll    : ()=>{
                document.execCommand("selectAll");
                return this;
            },
            fullScr    : (anyStr,full=1)=>{
                let e = this.doc.query(anyStr);
                if(this.inValid(e)) return this;
                if (full==1 && document.fullscreenEnabled) {
                    e.requestFullscreen();
                    return this;
                }
                if (full==0 && document.exitFullscreen) {
                    e.exitFullscreen();
                }
                return this;
            },
        },
        cre     :   {
            ds      :   (  )=>{
                return this;
            },
            eve     :   {
                mouse   : ()=>{
                    let x = document.createEvent("MouseEvent");
                        //x.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    //document.getElementById("myDiv").dispatchEvent(x);
                },
            },
            fgm     :   ()=>{
                return document.createDocumentFragment();
            },
            comm    :   (obj,comm)=>{
                let c = document.createComment(comm);
                obj.appendChild(c);
            },
            elm     :   (tag,id,cl)=>{
                let e = document.createElement(tag);
                this.elm.idcl(id,cl,e);
                return e;
            },
            att     :   (key,val='')=>{
                let att = document.createAttribute(key);
                    if(val.length > 0)att.value = val;
                return att;
            },
            
        },
        celm    :   (...args)=>{
            return this.docu.cre.elm(...args);
        },
        zidx    :   {
            max     :   ()=>{
                let max_idx = 0;
                let tags = this.docu.queryAll('body *');

                for(let tag of tags){
                    let idx = tag.style.zIndex;
                    if(idx == '')idx = 0;
                    else if(parseInt(idx) > max_idx)
                        max_idx = idx;
                }
                return max_idx;
            },
        },
    }
    
    //#got
    got     =   {
        type    :   (obj)=>{
            //let jstr = JSON.stringify( obj.toString() );// ;JSON.stringify(`${obj}`);
            let jstr = JSON.stringify(`${obj}`);
            let str  = jstr.replace(/[\[\]]+/g,'');
            let arr  = jstr.match(/([a-z]+)\s*([a-zA-Z]*)/i);
                //if(arr == 0){ return 0;};
                //
                //
            if(Array.isArray(arr)){
                if(arr.length == 3){
                    return arr[2];
                }else if(arr.length == 2){
                    return arr[1];
                }else if(arr.length == 1){
                    return arr[0];
                }
            }
            return str;
        },
        
    }
    
    elm     =   {
            //#id
        id      :   (str,target)=>{
            try{
                if(typeof str == 'string' && str.length > 0){
                    target.setAttribute("id",str);
                }
            }catch(err){
                $lg('200::Ajs::id:49',err.message);
            }
            return target;
        },
        
        //#cl
        cl      :   (str,tar)=>{
            if(typeof str == 'string' && str.length > 0){
              tar.setAttribute("class",str);
            }
            return tar;
        },
        //#cl
        html    :   (str,tar)=>{
            if(typeof str == 'string' && str.length > 0){
              tar.innerHTML = str;
            }
            return tar;
        },
        
        //#idcl
        idcl    :   (id,cl,tar)=>{
            this.elm.id(id,tar);
            this.elm.cl(cl,tar);
            return this;
        },
    
    }
    //#bug
    bug     =   (err,argu,pos,...args)=>{
        let msg =  ( err.message == undefined ? err : err.message )  + '\n';
            msg += pos + '\n';
            msg += `args:\n${JSON.stringify(argu)}\n`;
        alert(msg);
    }
    
    clone0   =   (origin)=>{
        
        let originProto = Object.getPrototypeOf(origin);
        return Object.assign(Object.create(originProto),origin);
    }
    
    /* Shallow clone an object */
    static clone(object) {
      var newObject = Object.create(null);
    
      var property = void 0;
      for (property in object) {
        if (Reflect.apply(Object.hasOwnProperty, object, [property])) {
          newObject[property] = object[property];
        }
      }
    
      return newObject;
    }
    
    
    static objType(obj){
    //let jstr = JSON.stringify( obj.toString() );// ;JSON.stringify(`${obj}`);
    let jstr = JSON.stringify(`${obj}`);
    let str  = jstr.replace(/[\[\]]+/g,'');
    let arr  = jstr.match(/([a-z]+)\s*([a-zA-Z]*)/i);
        //if(arr == 0){ return 0;};
        //
        //
    if(Array.isArray(arr)){
        //return arr[0];
        if(arr.length == 3){
            return arr[2];
        }else if(arr.length == 2){
            return arr[1];
        }else if(arr.length == 1){
            return arr[0];
        }
    }
    return str;
  }
    
    //#type(ajs)
    static type(any){
        if(Array.isArray(any)) return 'array';
        else return typeof(any);
    }
    /*
    static type(obj){
        const arr = ['undefined','function','symbol','NaN','boolean','object','array','number','string','null'];
        let rst  = undefined;
        let item = arr.pop();
        const ask = () =>{
            item = arr.pop();
            rst  = typeof(obj) == item ? item : 
                      item == undefined ? undefined : ask(); 
            return rst;
        }
        try{
            rst = Array.isArray(obj) ? 'array' : 
                      typeof(obj) == item ? item : 
                          ask() ;
            return rst;
        }catch(err){
            alert('267::Ajs::type>error:\n'+err.message);
            return 'error';
        }
    }
    */
    
    static runAll  =   (obj,except=['all'])=>{
        
        let fs = Reflect.ownKeys(obj);
        //
        for(let f of fs){
            if( except.includes(f) )continue;
            let oo = Reflect.get(obj,f);
            if(typeof(oo) == 'function'){
                oo();
            }else if(typeof(oo) == 'object'){
                Ajs.runAll(oo);
            }
        }
        return this;
    }
    
}

export class Doc{
    constructor(){
        
    }
   
    static api    =   {
        ds      :   ()=>{
            return Doc;
        },
        domain  :   ()=>{
            return document.domain;
        },
        url     :   ()=>{
            return document.URL;
        },
        uri     :   (...args)=>{
            if(args.length == 0)return document.documentURI;
            if(args.length > 0 && args[0].length > 0) {
                document.documentURI = args[0];
                return Doc;
            }
            
        },
        
        
        cspv    :   (obj,ppt)=>{
            return window.getComputedStyle(obj)
                         .getPropertyValue(ppt);

        },
        gbid    :   (id)=>{
            //$lg('Ajs::gbid::47::id',id);
            return document.getElementById(id);
        },
        gbcl    :   (clazz)=>{
            return document.getElementsByClassName(clazz);
        },
        gbna    :   (name)=>{
            return document.getElementsByTagName(anyStr);
        },
        gbtg    :   (tag)=>{
            return document.getElementsByTagName(tag);
        },
        query   :   (anyStr)=>{
            //$lg('Doc::392::anyStr',anyStr);
            return document.querySelector(anyStr);
        },
        queryAll:   (anyStr)=>{
            return document.querySelectorAll(anyStr);
        },
        
        title   :   (...args)=>{
            if(args.length == 0) return document.title;
            if(args.length > 0 && args[0].length > 0) {
                document.title = args[0];
                return Doc;
            }
        },
        head    :   ()=>{
            return document.head;
        },
        body    :   ()=>{
            return document.body;
        },
        rs      :   ()=>{
            return document.readyState;
        },
        ref     :   ()=>{
            return document.referrer;
        },
        exec     :   {
            copy    : (val)=>{
                document.execCommand("copy",false,val);
                return Doc;
            },
            cut    : ()=>{
                document.execCommand("cut");
                return Doc;
            },
            paste    : ()=>{
                document.execCommand("paste");
                return Doc;
            },
            selectAll    : ()=>{
                document.execCommand("selectAll");
                return Doc;
            },
            fullScr    : (anyStr,full=1)=>{
                let e = Doc.api.query(anyStr);
                if(Doc.inValid(e)) return Doc;
                if (full==1 && document.fullscreenEnabled) {
                    e.requestFullscreen();
                    return Doc;
                }
                if (full==0 && document.exitFullscreen) {
                    e.exitFullscreen();
                }
                return Doc;
            },
        },
        
        cre     :   {
            ds      :   (  )=>{
                return Doc;
            },
            eve     :   {
                mouse   : ()=>{
                    let x = document.createEvent("MouseEvent");
                        //x.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    //document.getElementById("myDiv").dispatchEvent(x);
                },
            },
            fgm     :   ()=>{
                return document.createDocumentFragment();
            },
            comm    :   (obj,comm)=>{
                let c = document.createComment(comm);
                obj.appendChild(c);
            },
            elm     :   (tag,id='',cl='',html='',eveArr=null)=>{
                let e = document.createElement(tag);
                if(id   !== '') e.setAttribute('id',id);
                if(cl   !== '') e.setAttribute('class',cl);
                if(html !== '') e.innerHTML = html;
                if(eveArr == null)return e;
                for(let obj of eveArr){
                    e.setAttribute(`on${obj.name}`,obj.callback);
                }
                e.setAttribute('data-ajs-idx',Html.didx);
                Html.didx++;
                return e;
            },
            att     :   (key,val='')=>{
                let att = document.createAttribute(key);
                    if(val.length > 0)att.value = val;
                return att;
            },
            
        },
        celm    :   (...args)=>{
            return Doc.api.cre.elm(...args);
        },
        zidx    :   {
            max     :   ()=>{
                let max_idx = 0;
                let tags = Doc.api.queryAll('body *');

                for(let tag of tags){
                    let idx = tag.style.zIndex;
                    if(idx == '')idx = 0;
                    else if(parseInt(idx) > max_idx)
                        max_idx = idx;
                }
                return max_idx;
            },
        },
    }
    
    static add    = (tag,id='',cl='',html='',eveArr=null)=>{
        let e = Doc.api.celm(tag,id,cl,html,eveArr);
        document.appendChild(e);
    }
    
    static bindEvent = (docElm,eventArr)=>{
        if(eventArr == null) return;
        
        for(let obj of eventArr){
            let event = obj.event;
            let callback = obj.callback;
            let pfix = event.startsWith('on') ? '' : 'on';
            Reflect.set(docElm,`${pfix}${event}`,callback);
        }
        
        return docElm;
        
    }
    
    static has = (anyStr)=>{
      if(document.querySelector(anyStr)) return true;
      else return false;
    }
    
}

//@html
/**
 * 
 * 
 * version 2.0   2023.06.08  
 *      改用createDocumentFragment()向document插入元素
 **/ 
export class Html extends Ajs{
  
  constructor(){
      super();
      if(window.$lg == undefined){
          //new Log();
      }
      
      window.$all = this.doc.queryAll;
      window.$que = this.doc.query;
      
      
      if(Html.instId == undefined){
          Html.instId = 0;
      }else{
          Html.instId++;
      }
      
      this.instId = Html.instId;
      
      if(Html.didx == undefined){
          //Html.didx = 0;
          this._html.autoDefine();
          let idxs = document.querySelectorAll[`*[data-ajs-idx]`];
          if(idxs == undefined || idxs.length == 0) Html.didx = 0
          else Html.didx = idxs.length;
          
      }else{
          Html.didx++;
      }
      
      this.object = undefined;
      this.topObject  = undefined;
      this.stepTopMode = 0;
      //TopObjectArray
      this.toa = [];
      this.frags = this._html.obj.frags();
      
      //for queryAll
      this.result = [];
      
      window.$$ = this.$$;
      window.$h = this;
      
  
  }
  
  //#step
  step(val=0){
      this.stepTopMode = val;
      return this;
  }
  
  
  
  //#_setAtt
  _setAtt(prop,val){
      if(this.object == null || this.object == undefined){return alert('Html::_setAtt:this.object == null');};
      try{
          let types = Ajs.objType(this.object);
          //alert(JSON.stringify(typeArr));
          if(types == 'DocumentFragment' && this.lastExec == 'dom'){
              let tobj = this.frags[this.fidx-1].top;
                if(tobj == null){alert('html::_setAtt:125:\n tobj == null'); return this;};
              tobj.setAttribute(prop,val);
          }else if(types.match(/HTML/i)){
              this.object.setAttribute(prop,val);
          }else{
              alert('html::_setAtt:130:\n setAttribute fail');
              return this;
          }
      }catch(err){
          let msg =  'Html::_setAtt:134:\n'+err.message +'\n';
              msg +=  JSON.stringify(`${this.object}`) + '\n';
          alert(msg);
      }
      return this;
  }
  

  
  //#wh
  wh(width,height){
    if(this.object == undefined) return this;
    if(this.object == null) return this;
    this.object.setAttribute('width',width)
    this.object.setAttribute('height',height)
    return this;
  }
  
  //#alt
  alt(pos,msg){
    let p = pos.split('.');
    let ss = '';
    for(let s of p){
      ss += s + ' > ';
    }
    ss += '\n'+msg;
    return $lg('Html::alt',ss);
  }
 
  
  //#id
  id(str,tar=this.object){
    try{
      if(typeof str == 'string' && str.length > 0){
        tar.setAttribute("id",str);
        this.lastId = str;
      }
    }catch(err){
      this.msg(err.toString());
      let num = document.all.length;
      this.msg(num.toString());
      let obj1 = document.all[document.all.length-1];
      let htm = obj1.tagName;
      this.msg(htm);
    }
    return this;
  }
  
  //#data
  data(name,id){
    this.object.setAttribute('data-ajs-'+name,id);
    return this;
  }
  
  //#cl
  cl(str,tar=this.object){
    if(str != undefined && str.length > 0){
      tar.setAttribute("class",str);
    }
    return this;
  }


  //#dom()
  //#dom(html)
  dom(any = null){
  
    //let DocObj = rst.length > 1 ? rst : rst[0];
    let DocObj = null ;
    let mark   = '';
    if( typeof(any) == 'string' ){
      DocObj = document.querySelector(any);
      mark = any;
    }else
    if( typeof(any) == 'object' ){
      DocObj = any ;
      mark = `obj:${Ajs.objType(any)}`;
    }
    /*if(anyStr == '.panel-cata .panel-menu'){
      $lg('ajs::678::bgo',anyStr);
      $lg('ajs::678::bgg',JSON.stringify(DocObj),Ajs.objType(DocObj),DocObj.length === null,DocObj.length === undefined);
    }*/
    this.frags.addFrag(this._html.obj.frag(mark,DocObj));
    
    this.topObject = this.frags.lastFrag();
    
    this.object = this.frags.lastFrag().top;

    return this;
    
  }
  
  before(){
    
    this.frags.lastFrag().before = 1;
    
    return this;
    
  }
  
  after(){
    
    this.frags.lastFrag().after = 1;
    
    return this;
    
  }
  
  //#top(html)
  top(...args){
    //this._showFrags();
    
    if(args.length == 0){
      //$lg('688::args.length == 0');
      this.topObject = this.object;
      
    
    }else{
      let tobj = undefined;
      //topObject.type == 'frag';
      if(this.topObject == undefined){
          //$lg('703::this.topObject == undefined');
      }else if(this.topObject.type == undefined){
          //$lg('696::this.topObject.type == undefined');
      }else if(this.topObject.type == 'frag'){
          //$lg('698::this.topObject.type == frag');
          tobj = this.topObject.query(args[0]);
      }else{
          
      }
      //let tobj = this.__fgQuery(`*[data-ajs-idx='${Html.didx-1}']`);
        
      if(this.valid(tobj)){
          this.topObject = tobj
      }else{
          //$lg('707::tobj==null,tobj,args::bgo',tobj,args);
          //alert('716::tobj = undefined;');
      }
    } 
    return this;
  }
  
  //#as
  as(...args){
      //$lg('691::n',n);
      if(args.length === 0){
        this.toa[0] = this.object;
        //$lg('729::args.length === 0');
        return this;
      }
      if(typeof(args[0]) !== 'number')alert('730::must be number');
      else this.toa[args[0]] = this.object;
      return this;
  }
  
  grab(n){
      if(n == undefined) {
          alert('739::must input a number');
          return this;
      }
      if(typeof(n) !== 'number') {
          alert('743::must be a number');
          return this;
      }
      
      this.object = this.toa[n];
      return this;
  }
  
  
  //#ok
  ok(){
      //$lg('734::ok::before::readyState::bgy',document.readyState);
      this.frags.out();
      this._html.reset();
      //$lg('737::ok::finish::bgb',Log.now());
            
      return this;
  }

  pack(){
    //$lg(`783,pack start,${Log.now()}::bgy`);
    let bag = this.frags.pack();
    //$lg(`785,pack done,${Log.now()}::bgy`);
    this._html.reset();
    return bag;
  }

  
  
  //#query(html)
  queryAll(anyStr,n = -1){
      //$lg('782::query');
      let arr = this.frags.query(anyStr);
      
      if(arr.length > 0){
        if(n > -1){
          this.result = Array.of(arr[n]);
          this.object = Array.of(arr[n]);
        }else{ 
          this.result = Array.of(...arr);
          this.object = Array.of(...arr);//on.mouseDown
        }
      }
      return this;
  }
  
  query(anyStr){
    return this.queryAll(anyStr,0);
  }
  
  
  
  $$(...args){
    return this.queryAll(...args);
  }

  doc = {
    
    queryAll : (anyStr,n=-1)=>{
      
      let objs = document.querySelectorAll(anyStr);
      if(objs == null) return this;
      if(n >= 0)this.object = objs[n];
      else this.object = objs;
      return this;
      
    },
    
    query : (...args)=>{
      return this.doc.queryAll(...args,0);
    },
    
    que : (anyStr)=>{
      
      return this.doc.qall(anyStr,0);
      
    },
    
    qall : (...args)=>{
      return this.doc.queryAll(...args);
    },
    
  }

  
  
  //#text
  text(cont,a=0){
    if(cont.length == 0)return this;
    if(this.object != undefined){
      this.object.innerText = cont;
    }else{
        let msg = 'ajs::html::text:665:\n';
            msg += 'this.object == undefined\n'
            msg += `your input:text(${cont},...)\n`;
        alert(msg);
    }
    return this;
  }
  
  inrHtml(html,e){
      if(html.length>0){
          if(html.match(/\&[a-zA-Z]{2,10}/g)){
            html = html.replace('"','');
            //html = &#8801;
          }
          e.innerHTML = html;
      }
      return this;
  }
  
  //#classList
  classList = {
    valid : (obj)=>{
        if(obj == null ){
            let msg =  'html::classList:497\n';
                msg += 'obj == null';
            alert(msg);
            return 0;
        }
        return 1;
    },
    arr : ()=>{
        //alert(this.object.class);
        if( this.object.className == undefined){
            //
            return [];
        } 
        //
        return this.object.className.split(' ');
    },
    add : (className)=>{
        let valid = this.classList.valid;
            if(valid(this.object) == 0 ){return this;}
        let arr = this.classList.arr();
        //
            //if(arr == null){ alert('html::classList.add:516:arr == null') ; return this ; };
        if(arr.includes(className) == 0){
            arr.push(className);
            this._setAtt('class',arr.join(' '));
            //this.object.setAttribute('class',arr.join(' '));
        };
        return this;
    },
    del : (className)=>{
        let valid = this.classList.valid;
            if(valid(this.object) == 0 ){
                return this;
            }
        let arr = this.classList.arr();
            if(arr == null){
                /*alert('html::classList.add:516:arr == null') ; */ 
                return this ;
            };
        let idx = arr.indexOf(className);
            if(idx == -1) {
                return this;
            }
        arr.splice(idx,1);
        this._setAtt('class',arr.join(' '));
        //this.object.setAttribute('class',arr.join(' '));
        return this;
    },
    remove : (...args)=>{
        return this.classList.del(...args);
    },
  }
  
  //#clist
  clist = this.classList;
  
  //#attr
  attr(name,prop){
    let mrst = name.match(/style\.([a-zA-Z]+)/i);
    if(mrst && mrst[1]){
        Reflect.set(this.object.style,mrst[1],prop);
    }else{
        this.object.setAttribute(name,prop);
    }
    return this;
  }
  
  disable(...args){
      if(args.length == 0)args[0] = 1;
      this.at.disabled(...args);
      return this;
  }
  
  data(fix,val){
    this.object.setAttribute('data-ajs-'+fix,val);
    return this;
  }

  role(val){
    this.attr(prop,val);
    return this;
  }
  
  ar = {
    base : (prop,val)=>{
              this.attr(prop,val);
              return this;
            },
    live : (val)=>{return this.ar.base('aria-live',val);},
    atom : (val)=>{return this.ar.base('aria-atomic',val);},
    live : (val)=>{return this.ar.base('aria-live',val);},
    label : (val)=>{return this.ar.base('aria-label',val);},
    hidden : (val='')=>{return this.ar.base('aria-hidden',val);},
  }
  
  //#meta
  meta = {
    base    : (prop,value,cont="")=>{
                let e = document.createElement( "meta" );
                    e.setAttribute( prop, value );
                    if(cont.length>0)e.setAttribute( "content", cont );
                this._html.fgAdd(e);
                return this.meta;
               },

    nocache : ()=>{ this.meta.base("http-equiv",'pragma',       "no-cache")
                             .base("http-equiv",'cache-control',"no-cache")
                   return this.meta ;
              },
    charset : (cont='utf-8')=>{return this.meta.base("charset",cont,"");},
    type    : (cont='text/html')=>{return this.meta.base("http-equiv","content-type",cont);},//
    eventSource   : (cont='text/event-stream')=>{return this.meta.base("http-equiv","content-type",cont);},//
    lang    : (cont='zh-cn')=>{return this.meta.base("http-equiv","Content-Language",cont);},
    viewport: (cont='1.0',max='1.0',adj='no')=>{
                let text = `width=device-width, initial-scale='${cont}',maximum-scale=${max}, user-scalable=${adj},shrink-to-fit=no`;
                return this.meta.base("name","viewport",text);
               },
    scale: (init='1.0',max='1.0')=>{
                let text = `width=device-width, initial-scale='${init}',maximum-scale='${max}'`;
                return this.meta.base("name","viewport",text);
               },
    noscale: ()=>{
                let text = `user-scalable=0`;
                return this.meta.base("name","viewport",text);
               },
    expires : (cont='')=>{return this.meta.base("http-equiv","expires",  cont);},
    refresh : (cont)=>{return this.meta.base("http-equiv","refresh",     cont);},
    cookie  : (cont)=>{return this.meta.base("http-equiv","set-cookie",  cont);},
    author  : (cont)=>{return this.meta.base("name","author",  cont);},
    description  : (cont)=>{return this.meta.base("name","description", cont);},
    keywords     : (cont)=>{return this.meta.base("name","keywords",    cont);},
    generator    : (cont)=>{return this.meta.base("name","generator",   cont);},
    revised      : (cont)=>{return this.meta.base("name","revised",     cont);},
    others       : (cont)=>{return this.meta.base("name","others",      cont);},
    ds           : ()=>{return this;}
  }
  
  
  input = {
    base    : (type,...args)=>{
                  return this._html.handle.tag('input',`ty:${type}`,...args);
               },
    button   : (...args)=>{return this.input.base('button',  ...args);},
    checkbox : (...args)=>{return this.input.base('checkbox',...args);},
    file     : (...args)=>{return this.input.base('file',    ...args);},
    password : (...args)=>{return this.input.base('password',...args);},
    radio    : (...args)=>{return this.input.base('radio',   ...args);},
    text     : (...args)=>{return this.input.base('text',    ...args);},
    reset    : (...args)=>{return this.input.base('reset',   ...args);},
    submit   : (...args)=>{return this.input.base('submit',  ...args);},
    range    : (...args)=>{return this.input.base('range',   ...args);},
  }
  
  
  btn = {
    base    : (id,cl,type)=>{
                let e = document.createElement( "button" );
                    e.setAttribute( "type", type );
                this.addIdClass(id,cl);
                this._html.fgAdd(e);
                return this;
               },
    button   : (id,cl,type='button')=>{return this.btn.base(id,cl,"button");},
    reset    : (id,cl,type)=>{return this.btn.base(id,cl,"reset");},
    submit   : (id,cl,type)=>{return this.btn.base(id,cl,"submit");}
  }

  //#add(html)
  add = {
    base    : (tagName,id='',cl='')=>{
                let e = this.docu.celm(tagName);
                this.elm.idcl(id,cl,e);
                this._html.fgAdd(e);
                return this;
              },
    div     : (id='',cl='')=>{return this.base('div',     id,cl);},
    table   : (id='',cl='')=>{return this.base('table',   id,cl);},
    canvas  : (id='',cl='')=>{return this.base('canvas',  id,cl);},
    a       : (id='',cl='')=>{return this.base('a',       id,cl);},
    p       : (id='',cl='')=>{return this.base('p',       id,cl);},
    ul      : (id='',cl='')=>{return this.base('ul',      id,cl);},
    ol      : (id='',cl='')=>{return this.base('ol',      id,cl);},
    li      : (id='',cl='')=>{return this.base('li',      id,cl);},
    audio   : (id='',cl='')=>{return this.base('audio',   id,cl);},
    video   : (id='',cl='')=>{return this.base('video',   id,cl);},
    option  : (id='',cl='')=>{return this.base('option',  id,cl);},
    select  : (id='',cl='')=>{return this.base('select',  id,cl);},
    td      : (id='',cl='')=>{return this.base('td',      id,cl);},
    th      : (id='',cl='')=>{return this.base('th',      id,cl);},
    tr      : (id='',cl='')=>{return this.base('tr',      id,cl);},
    img     : (id='',cl='')=>{return this.base('img',     id,cl);},
    article : (id='',cl='')=>{return this.base('article', id,cl);},
    
    ds      : ()=>{ return this; },
    
         
  }
  
  //#copy(html)
  copy(...args){
      if(this.object == null || this.topObject == null){
          let msg  = 'Html::copy::1058\n';
              msg += 'this.object or topObject == null\n';
              msg += `input: copy(${[...args].join(',')})\n`;
          alert(msg);
      }
      if(args.length == 1 && typeof args[0] == 'number'){
          let obj = this.object;
          let ope = this.object.parentElement;
          let [tag,id,cl] = [obj.nodeName, obj.id, obj.className];
          //this.dom('#'+this.topObject.id);
          let stepVal = this.stepTopMode;
          this.step(0);
          for(let i = 0 ; i < args[0] ; i++){
              //Reflect.get(this.add,'base')(tag.toLowerCase(),id,cl);
              let newObj = obj.cloneNode(true);
                  newObj.setAttribute('data-ajs-idx',Html.didx);
                  Html.didx++;
              ope.appendChild(newObj);
          }
          this.step(stepVal);
          //this.ok();
      }else if( args.length     == 2 ){
            let [a1,a2]  = [...args];
            let type = {
                a1 : typeof a1,
                a2 : typeof a2,
            }
            if(type.a1  == 'number'){
                if(type.a2  == 'string'){
                    if(a2 == 'complex' || a2 == 'cpx'){
                        return this.copyComplex.conf.num(a1);
                    }else{
                        
                    }
                }else if(type.a2  == 'object'){
                }
            }else if(type.a1  == 'string'){
                
            }
      }
      return this;
  }
  
  copyComplex = {
      para : {
          num  : 0,
          id   : '',
          cl   : '',
          cid  : '',
          ccl  : '',
          into : this.topObject,
          tar  : this.object,
      },
      conf : {
          num  : (val)=>{this.copyComplex.para.num = val;    return this.copyComplex.conf;},
          id   : (val)=>{this.copyComplex.para.id  = val;    return this.copyComplex.conf;},
          cl   : (val)=>{this.copyComplex.para.cl  = val;    return this.copyComplex.conf;},
          cid  : (val)=>{this.copyComplex.para.cid = val;    return this.copyComplex.conf;},
          ccl  : (val)=>{this.copyComplex.para.ccl = val;    return this.copyComplex.conf;},
          into : (anyStr)=>{this.copyComplex.para.into = anyStr;    return this.copyComplex.conf;},
          done : ()=>{ return this.copyComplex.exec },
      },
      exec : ()=>{
          //new fgm
          //this.object.cloneNode
          //reset id,cl,...attr
          //fgm.appendChild
          //topObject.appendChild(fgm)
          return this;
      },
      ds : ()=>{
          return this;
      }
  }
  
  copyCpx = this.copyComplex;


  clone(...args) {
      //$lg('ajs::1152',...args);
      let [i,whom,num] = [-1,null,null];
      const f = (a,n) =>{
          if(n > 0)return a.substr(0,n);
          else return null;
      } 
      
      let len = args.length;
      
      if( len === 1){
        let a = args[0];
        let t = Ajs.type(a);
        if( t === 'number'){
          whom = this.object;
          if( a > 0 )num = a;
        }else 
        if( t === 'string'){
            //'1x10'
            let m = /(\d+)x(\d+)/i.exec( a );
            if( m ){
              whom = this.toa[m[1]];
              num  = m[2];
            }
        };
      }else if( len === 2 ){
      
        for(let a of args){
          i++;
          let t = Ajs.type(a);
          //$lg('ajs::1161',`i:${i};a:${a};t:${t}`);
          if( t === 'number'){
                    if( i === 0){
                        if( a > -1) whom = this.toa[a];
                    }else if( i === 1){
                        if( a > 0 )num = a;
                    }
          }
      }
      //$lg('ajs::1173',`who:${who};num:${num}`);
      }
      if( whom && num > 0){
          //$lg('ajs::1174::bgb',whom,num);
          //let parent = whom.parent;
          let parent = whom.parentElement;
          
          if(parent){
            
              //$lg('ajs::1207::bgb',parent.className);
              
              let node = [];
              for(let i = 0; i<num; i++){
                  let newNode = whom.cloneNode(true);
                      this._html.setIdx(newNode);
                  node.push( newNode );
              }
              parent.append(...node);
          }
      }
      return this;
  }


  into(...args){
    
    
    return this.to(...args);
  }

  
  //#controls
  controls(val='controls'){
      this._setAtt('controls',val);
      return this;
  }
  
  //#src
  src(url){
      this._setAtt('src',url);
      return this;
  }

  aria(val){
    this.object.setAttribute('aria',val);
    return this;
  }

  
  
  //#demo
  demo(tit=''){
      //document.doctype = 'html5';
      this.dom('head')
          .title(`!${tit}`)
          .meta .charset()
                .scale()
                .noscale()
                .nocache()
                .expires().ds()
          .ok();
    return this;   
  }

    //#att
    at = {
      base      : (prop,val)=>{
                  try{
                    this.object.setAttribute(prop,val);
                  }catch(err){
                    this.msg(err.toString());
                  }
                    return this;
                  },
      id        : (str)=>{return this.at.base('id',          str)},
      class     : (str)=>{return this.at.base('class',       str)},
      clazz     : (str)=>{return this.at.base('class',       str)},
      name      : (str)=>{return this.at.base('name',        str)},
      style     : (str)=>{return this.at.base('style',       str)},
      data      : (str,val)=>{return this.at.base(str,        val)},
      
      title     : (str)=>{return this.at.base('title',       str)},
      lang      : (str)=>{return this.at.base('lang',        str)},
      type      : (str)=>{return this.at.base('type',        str)},
      alt       : (str)=>{return this.at.base('alt',        str)},
      
      min       : (num)=>{return this.at.base('min',       num)},
      max       : (num)=>{return this.at.base('max',       num)},
      value     : (str)=>{return this.at.base('value',       str)},
      rows      : (str)=>{return this.at.base('rows',        str)},
      cols      : (str)=>{return this.at.base('cols',        str)},
      tabindex  : (num)=>{return this.at.base('tabindex',    num)},
      draggable : (bool)=>{return this.at.base('draggable',  bool)},
      disabled  : (bool)=>{return this.at.base('disabled',   bool)},
      readonly  : (bool)=>{return this.at.base('readOnly',   bool)},
      width     :  (num)=>{return this.at.base('width',      num)},
      height    :  (num)=>{return this.at.base('height',     num)},
      src       :  (str)=>{return this.at.base('src',        str)},
      controls  :  (str)=>{return this.at.base('controls',   str)},
      autofocus :  (bool)=>{return this.at.base('autofocus',  bool)},
      
      ds        :  ()=>{return this;}
      
    }
    
    //#on
    on = {
      //Window 事件属性
      afterprint        : (callback,pop=0,mode=1,event='afterprint')=>{return this._html.eve(callback,pop,event,mode);},
      beforeprint       : (callback,pop=0,mode=1,event='beforeprint')=>{return this._html.eve(callback,pop,event,mode);},
      beforeload        : (callback,pop=0,mode=1,event='beforeload')=>{return this._html.eve(callback,pop,event,mode);},
      blur              : (callback,pop=0,mode=1,event='blur')=>{return this._html.eve(callback,pop,event,mode);},
      error             : (callback,pop=0,mode=1,event='error')=>{return this._html.eve(callback,pop,event,mode);},
      focus             : (callback,pop=0,mode=1,event='focus')=>{return this._html.eve(callback,pop,event,mode);},
      haschange         : (callback,pop=0,mode=1,event='haschange')=>{return this._html.eve(callback,pop,event,mode);},
      load              : (callback,pop=0,mode=1,event='load')=>{/*$lg('ajs::html::on::1405::onload');*/return this.eve(callback,pop,event,mode);},
      message           : (callback,pop=0,mode=1,event='message')=>{return this._html.eve(callback,pop,event,mode);},
      offline           : (callback,pop=0,mode=1,event='offline')=>{return this._html.eve(callback,pop,event,mode);},
      line              : (callback,pop=0,mode=1,event='line')=>{return this._html.eve(callback,pop,event,mode);},
      pagehide          : (callback,pop=0,mode=1,event='pagehide')=>{return this._html.eve(callback,pop,event,mode);},
      pageshow          : (callback,pop=0,mode=1,event='pageshow')=>{return this._html.eve(callback,pop,event,mode);},
      popstate          : (callback,pop=0,mode=1,event='popstate')=>{return this._html.eve(callback,pop,event,mode);},
      redo              : (callback,pop=0,mode=1,event='redo')=>{return this._html.eve(callback,pop,event,mode);},
      resize            : (callback,pop=0,mode=1,event='resize')=>{return this._html.eve(callback,pop,event,mode);},
      storage           : (callback,pop=0,mode=1,event='storage')=>{return this._html.eve(callback,pop,event,mode);},
      undo              : (callback,pop=0,mode=1,event='undo')=>{return this._html.eve(callback,pop,event,mode);},
      unload            : (callback,pop=0,mode=1,event='unload')=>{return this._html.eve(callback,pop,event,mode);},
      
      //表单事件
      blur              : (callback,pop=0,mode=1,event='blur')=>{return this._html.eve(callback,pop,event,mode);},
      change            : (callback,pop=0,mode=1,event='change')=>{return this._html.eve(callback,pop,event,mode);},
      contextmenu       : (callback,pop=0,mode=1,event='contextmenu')=>{return this._html.eve(callback,pop,event,mode);},
      context           : (callback,pop=0,mode=1,event='contextmenu')=>{return this._html.eve(callback,pop,event,mode);},
      focus             : (callback,pop=0,mode=1,event='focus')=>{return this._html.eve(callback,pop,event,mode);},
      formchange        : (callback,pop=0,mode=1,event='formchange')=>{return this._html.eve(callback,pop,event,mode);},
      forminput         : (callback,pop=0,mode=1,event='forminput')=>{return this._html.eve(callback,pop,event,mode);},
      input             : (callback,pop=0,mode=1,event='input')=>{return this._html.eve(callback,pop,event,mode);},
      invalid           : (callback,pop=0,mode=1,event='invalid')=>{return this._html.eve(callback,pop,event,mode);},
      reset             : (callback,pop=0,mode=1,event='reset')=>{return this._html.eve(callback,pop,event,mode);},
      select            : (callback,pop=0,mode=1,event='select')=>{return this._html.eve(callback,pop,event,mode);},
      submit            : (callback,pop=0,mode=1,event='submit')=>{return this._html.eve(callback,pop,event,mode);},
      
      //键盘事件
      keydown           : (callback,pop=0,mode=1,event='keydown')=>{return this._html.eve(callback,pop,event,mode);},
      keypress          : (callback,pop=0,mode=1,event='keypress')=>{return this._html.eve(callback,pop,event,mode);},
      keyup             : (callback,pop=0,mode=1,event='keyup')=>{return this._html.eve(callback,pop,event,mode);},
      
      //鼠标事件
      click             : (callback,pop=0,mode=1,event='click')=>{return this._html.eve(callback,pop,event,mode);},
      dblClick          : (callback,pop=0,mode=1,event='dblclick')=>{return this._html.eve(callback,pop,event,mode);},
      drag              : (callback,pop=0,mode=1,event='drag')=>{return this._html.eve(callback,pop,event,mode);},
      dragEnd           : (callback,pop=0,mode=1,event='dragend')=>{return this._html.eve(callback,pop,event,mode);},
      dragEnter         : (callback,pop=0,mode=1,event='dragenter')=>{return this._html.eve(callback,pop,event,mode);},
      dragLeave         : (callback,pop=0,mode=1,event='dragleave')=>{return this._html.eve(callback,pop,event,mode);},
      dragOver          : (callback,pop=0,mode=1,event='dragover')=>{return this._html.eve(callback,pop,event,mode);},
      dragStart         : (callback,pop=0,mode=1,event='dragstart')=>{return this._html.eve(callback,pop,event,mode);},
      touchStart        : (callback,pop=0,mode=1,event='touchstart')=>{return this._html.eve(callback,pop,event,mode);},
      touchMove         : (callback,pop=0,mode=1,event='touchmove')=>{return this._html.eve(callback,pop,event,mode);},
      touchEnd          : (callback,pop=0,mode=1,event='touchend')=>{return this._html.eve(callback,pop,event,mode);},
      drop              : (callback,pop=0,mode=1,event='drop')=>{return this._html.eve(callback,pop,event,mode);},
      mouseDown         : (callback,pop=0,mode=1,event='mousedown')=>{return this._html.eve(callback,pop,event,mode);},
      mouseMove         : (callback,pop=0,mode=1,event='mousemove')=>{return this._html.eve(callback,pop,event,mode);},
      mouseOut          : (callback,pop=0,mode=1,event='mouseout')=>{return this._html.eve(callback,pop,event,mode);},
      mouseOver         : (callback,pop=0,mode=1,event='mouseover')=>{return this._html.eve(callback,pop,event,mode);},
      mouseUp           : (callback,pop=0,mode=1,event='mouseup')=>{return this._html.eve(callback,pop,event,mode);},
      mouseWheel        : (callback,pop=0,mode=1,event='mousewheel')=>{return this._html.eve(callback,pop,event,mode);},
      scroll            : (callback,pop=0,mode=1,event='scroll')=>{return this._html.eve(callback,pop,event,mode);},
      
      // 多媒体事件
      abort             : (callback,pop=0,mode=1,event='abort')=>{return this._html.eve(callback,pop,event,mode);},
      canPlay           : (callback,pop=0,mode=1,event='canplay')=>{return this._html.eve(callback,pop,event,mode);},
      canPlayThrough    : (callback,pop=0,mode=1,event='canplaythrough')=>{return this._html.eve(callback,pop,event,mode);},
      duratiChange      : (callback,pop=0,mode=1,event='duratichange')=>{return this._html.eve(callback,pop,event,mode);},
      emptied           : (callback,pop=0,mode=1,event='emptied')=>{return this._html.eve(callback,pop,event,mode);},
      ended             : (callback,pop=0,mode=1,event='ended')=>{return this._html.eve(callback,pop,event,mode);},
      error             : (callback,pop=0,mode=1,event='error')=>{return this._html.eve(callback,pop,event,mode);},
      loadedData        : (callback,pop=0,mode=1,event='loadeddata')=>{return this._html.eve(callback,pop,event,mode);},
      loadedMetaData    : (callback,pop=0,mode=1,event='loadedmetadata')=>{return this._html.eve(callback,pop,event,mode);},
      loadStart         : (callback,pop=0,mode=1,event='loadstart')=>{return this._html.eve(callback,pop,event,mode);},
      pause             : (callback,pop=0,mode=1,event='pause')=>{return this._html.eve(callback,pop,event,mode);},
      play              : (callback,pop=0,mode=1,event='pause')=>{return this._html.eve(callback,pop,event,mode);},
      playing           : (callback,pop=0,mode=1,event='playing')=>{return this._html.eve(callback,pop,event,mode);},
      progress          : (callback,pop=0,mode=1,event='progress')=>{return this._html.eve(callback,pop,event,mode);},
      rateChange        : (callback,pop=0,mode=1,event='ratechange')=>{return this._html.eve(callback,pop,event,mode);},
      readystateChange  : (callback,pop=0,mode=1,event='readystatechange')=>{return this._html.eve(callback,pop,event,mode);},
      seeked            : (callback,pop=0,mode=1,event='seeked')=>{return this._html.eve(callback,pop,event,mode);},
      seeking           : (callback,pop=0,mode=1,event='seeking')=>{return this._html.eve(callback,pop,event,mode);},
      stalled           : (callback,pop=0,mode=1,event='stalled')=>{return this._html.eve(callback,pop,event,mode);},
      suspEnd           : (callback,pop=0,mode=1,event='suspend')=>{return this._html.eve(callback,pop,event,mode);},
      timeUpdate        : (callback,pop=0,mode=1,event='timeupdate')=>{return this._html.eve(callback,pop,event,mode);},
      volumeChange      : (callback,pop=0,mode=1,event='volumechange')=>{return this._html.eve(callback,pop,event,mode);},
      waiting           : (callback,pop=0,mode=1,event='waiting')=>{return this._html.eve(callback,pop,event,mode);},
      
      //动画事件
      aniStart          : (callback,pop=0,mode=1,event='animationstart')=>{return this._html.eve(callback,pop,event,mode);},
      aniEnd            : (callback,pop=0,mode=1,event='animationend')=>{return this._html.eve(callback,pop,event,mode);},
      aniEnd_Wk         : (callback,pop=0,mode=1,event='webkitAnimationEnd')=>{return this._html.eve(callback,pop,event,mode);},
      aniIter           : (callback,pop=0,mode=1,event='animationiteration')=>{return this._html.eve(callback,pop,event,mode);},
      
      tsiStart          : (callback,pop=0,mode=1,event='transitionstart')=>{return this._html.eve(callback,pop,event,mode);},
      tsiEnd            : (callback,pop=0,mode=1,event='transitionend')=>{return this._html.eve(callback,pop,event,mode);},
  
    }

    //#_html(html)
    _html   =   {
      
        tags : {
            all      : [
                'a',
                'abbr',
                'address',
                
                'area',
                'article',
                'aside',
                'audio',
                'b',
                'base',
                'bdi',
                'bdo',
                'blockquote',
                'body',
                'br',
                'button',
                'canvas',
                'caption',
                'cite',
                'code',
                'col',
                'colgroup',
                //'data',
                'datalist',
                'dd',
                'del',
                'details',
                'dfn',
                'dialog',
                'div',
                'dl',
                'dt',
                'em',
                'embed',
                'fieldset',
                'figcaption',
                'figure',
                'footer',
                'form',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'head',
                'header',
                'hr',
                'html',
                'i',
                'iframe',
                'img',
                //'input',
                'ins',
                'kbd',
                'label',
                'legend',
                'li',
                'link',
                'main',
                'map',
                'mark',
                //'meta',
                'meter',
                'nav',
                'noscript',
                //'object',
                'ol',
                'optgroup',
                'option',
                'output',
                'p',
                'param',
                'picture',
                'pre',
                'progress',
                'q',
                'rp',
                'rt',
                'ruby',
                's',
                'samp',
                'script',
                'section',
                'select',
                'small',
                'source',
                'span',
                'strong',
                'style',
                'sub',
                'summary',
                'sup',
                'svg',
                'table',
                'tbody',
                'td',
                'template',
                'textarea',
                'tfoot',
                'th',
                'thead',
                'time',
                'title',
                'tr',
                'track',
                'u',
                'ul',
                'var',
                'video',
                'wbr'],
            basic    : [
                'doctype',
                'html',
                'head',
                'title',
                'body',
                'hn',
                'p',
                'br',
                'hr',
                'comment',
            ],
            format   : [
                'abbr',
                'address',
                'b',
                'bdi',
                'bdo',
                'blockquote',
                'cite',
                'code',
                'del',
                'dfn',
                'em',
                'i',
                'ins',
                'kbd',
                'mark',
                'meter',
                'pre',
                'progress',
                'q',
                'rp',
                'rt',
                'ruby',
                's',
                'samp',
                'small',
                'strong',
                'sub',
                'sup',
                'template',
                'time',
                'u',
                'var',
                'wbr',
            ],
            form     : [
                'form',
                'input',
                'textarea',
                'button',
                'select',
                'optgroup',
                'option',
                'label',
                'fieldset',
                'legend',
                'datalist',
                'output',
            ],
            frame    : [
                'iframe',
            ],
            image    : [
                'img',
                'map',
                'area',
                'canvas',
                'figcaption',
                'figure',
                'picture',
                'svg',
            ],
            avd      : [
                'audio',
                'source',
                'track',
                'video',
            ],
            link     : [
                'a',
                'link',
                'nav',
            ],
            list     : [
                'ul',
                'ol',
                'li',
                'dl',
                'dt',
                'dd',
            ],
            table    : [
                'table',
                'caption',
                'th',
                'tr',
                'td',
                'thead',
                'tbody',
                'tfoot',
                'col',
                'colgroup',
            ],
            style    : [
                'style',
                'div',
                'span',
                'header',
                'footer',
                'main',
                'section',
                'article',
                'aside',
                'details',
                'dialog',
                'summary',
                'data',
            ],
            meta     : [
                'head',
                'meta',
                'base',
            ],
            program  : [
                'script',
                'noscript',
                'embed',
                'object',
                'param',
            ],
        },
        
        attrs : {
          
            input  : [
                'autocomplete',
                'autofocus',
                'form',
                'formaction',
                'formenctype',
                'formmethod',
                'formnovalidate',
                'formtarget',
                'height',
                'width',
                'list',
                'min',
                'max',
                'multiple',
                'pattern',
                'placeholder',
                'required',
                'range',
                'step'
            ],
          
        },
        
        //##obj(html)
        obj  : {
            //##frags
            frags : (...args)=>{
            
                let fgs = {
                    type : 'frags',
                    arr   : [],
                    addFrag   : function(frag){
                        this.arr.push(frag);
                    },
                    lastFrag  : function(){
                        //return frag
                        return this.arr[this.arr.length-1];
                    },
                    query : function(anyStr){
                        let arrRst = [];
                        let arr = null;
                        for(let frag of this.arr){
                          let arr = frag.query(anyStr);
                          if(arr) arrRst.push(...arr);
                        }
                        return arrRst;
                    },
                    out   : function(){
                        //$lg('1553::frags.out()::start::bgg',Log.now());
                        
                        let fgm = document.createDocumentFragment();
                        //let pack = 0;
                        
                        for(let frag of this.arr){
                            
                            if(frag.top == null){
                              fgm.appendChild(frag.pack());
                            }else{
                              frag.out();
                            }
                        }
                        
                        return fgm;
                        
                        //$lg('1558::frags.out()::finish::bgb',Log.now());
       
                    },
                    pack  : function(){
                        //$lg('1553::frags.out()::start::bgb',Log.now());
                        let fgm = document.createDocumentFragment();
                        for(let frag of this.arr){
                            fgm.appendChild(frag.pack());
                        }
                        
                        return fgm;
                        //$lg('1558::frags.out()::finish::bgb',Log.now());
       
                    },
                    
                }
                return fgs;
            },
            //##frag
            frag  : (anyStr,topDocElm)=>{
                //let dcdf = document.createDocumentFragment();
                let ofg = {
                
                    from  : `${anyStr}`,
                    type  : 'frag',
                    que   : anyStr,
                    top   : topDocElm,
                    before : 0,
                    after : 0,
                    //fgm   : dcdf,
                    elms  : [], //DocElm
                    
                    //top(anyStr)
                    query  : function(anyStr){
                        let arrRst = [];
                        //$lg(`1655::query('${anyStr}')`);
                        let find = (elm,didx)=>{
                            /*$lg('ajs::1748',`id:'${elm.id}'`,`class:'${elm.className}'`,`node:'${elm.nodeName}'`,`pclass:'${elm.parentElement.className}'`);
                            if( elm.nodeName == '#text' ){
                              $lg('1750::textNode::bgo',`text:'${elm.innerText}'`,`type:'${elm.nodeType}'`);
                            }*/
                            if( elm.nodeType > 1 ) return;
                            if(elm.getAttribute('data-ajs-idx') == didx){
                                //$lg('1655::elm was found');
                                arrRst.push(elm);
                                //return elm;
                            }
                            if(elm.childElementCount > 0){
                                for(let child of elm.childNodes){
                                    find(child,didx);
                                }
                            }
                            //$lg('1662::elm was not found');
                            return arrRst;
                        }
                        //let fgmTree = this.fgm.cloneNode(true);      
                        let fgmTree = document.createDocumentFragment();     
                        let arr = [];
                        for(let DocElm of this.elms){
                            arr.push(DocElm);
                        }
                        fgmTree.append(...arr);
                        let arrDidx = [];
                        //$lg('1653::anyStr',anyStr);
                        let docObjs = fgmTree.querySelectorAll(anyStr);
                        //$lg('1676::docObjs.length',docObjs.length);
                        if(docObjs != null){
                            //$lg('1657',docObj[0].outerHTML);
                            for(let docObj of docObjs){
                              let didx = docObj.getAttribute('data-ajs-idx');
                              arrDidx.push(didx);
                            }
                            //$lg('1663::didx',didx);
                            for(let elm of this.elms){
                              //$lg('1665::elm',elm.outerHTML);
                              for(let idx of arrDidx){
                                find(elm,idx);
                              }
                            }
                            return arrRst;
                        }else{
                            let msg  = 'oops:\n';
                                msg += '在当前的fgm中找不到指定的内容:\n';
                                msg += `your input : '${anyStr}'`;
                            $lg('ajs::1791::bgo',msg);
                        }
                    },  

                    lastElm  : function(){
                        return this.elms[this.elms.length-1];
                    },
                    addElm   : function(DocElm){
                        this.elms.push(DocElm);
                    },
                    out      : function(){
                        //$lg('1605::frag.out()::start::bgb',this.from,Log.now());
       
                        
                        if(Array.isArray(this.top)){
                            for(let t of this.top){
                                t.appendChild(fgm);
                            }
                        
                        }else{
                            //$lg(`1616::${this.que}.appendChild::before::bgo`,Log.now());
                            if( this.before == 1 ){
                              if( this.top.parentElement && this.top )
                                for(let DocElm of this.elms){
                                    //this.top.parentElement.insertAdjacentElement('beforeBegin',DocElm);
                                    this.top.parentElement.insertBefore(DocElm,this.top);
                                }
                            }else 
                            if( this.after == 1 ){
                              if( this.top.parentElement && this.top )
                                for(let DocElm of this.elms){
                                    this.top.parentElement.insertAdjacentElement('afterEnd',DocElm);
                                }
                              
                            }else{
                              //$lg('1795::bgb',this.top.className,this.top.getAttribute('data-ajs-idx'));
                              let fgm = document.createDocumentFragment();
                              let elmArr = [];
                              for(let DocElm of this.elms){
                                  //fgm.appendChild(DocElm);
                                  elmArr.push(DocElm);
                              }
                              fgm.append(...elmArr);
                              if(this.from == '.panel-cata .panel-cont'){
                                /*$log.lgg('ajs::1801::',this.from);
                                $log.lgg('ajs::1802::',fgm.toString());*/
                                //$lg('ajs::1803::bgo',typeof(Doc.api.query(this.from)))
                              }
                              this.top.append(fgm);
                              //$lg('1805::rst',rst);
                            }
                            //$lg(`1618::${this.que}.appendChild::finish::bgo`,Log.now());
                         
                        }
                        
                        //$lg('1622::frag.out()::finish::bgb',Log.now());
       
                     
                    },
                    pack     : function(){
                        //$lg('1605::frag.out()::start::bgb',Log.now());
       
                        let fgm = document.createDocumentFragment();
                        let elmArr = [];
                        for(let DocElm of this.elms){
                            elmArr.push(DocElm);
                        }
                        fgm.append(...elmArr);
                        
                        return fgm;

                    },
                }
            
                return ofg;
            },
            
        },
        
        //##handler
        handle    :   {
          
            tag  : (tag,...args)=>{
                
                let e = this.docu.celm(tag);
                
                let ppts = [];
                
                let css = [];
                
                let [i,id,cl,ht,tobj,eveArr,add] = [-1,'','','',null,null,this._html.fgAdd];
                
                let [src,type] = [null,null];
                
                ppts.push({src},{type});
                
                const f = (a,n) =>{
                    if(n > 0)return a.substr(0,n);
                    else return null;
                }
                
                for(let a of args){
                    
                    i++;
                    const t = Ajs.type(a);
                    if      ( t === 'string' ){
                        const [f1,f2,f3] = [f(a,1), f(a,2), f(a,3)];
                        if(tag == 'input'){
                          //$lg('1817::a,f1,f2,f3::bgg',a,f1,f2,f3);
                        }
                        if     (f1 == '#'  ) {
                          id = a.slice(1);
                          if(id === 'hcw'){
                            //$lg('1704::hcw::args.length',args.length,...args);
                          }
                        }
                        else if(f1 == '.'  ) {
                          cl = a.slice(1);
                          /*$lg('1799::cl',cl);
                          if(cl == 'panel-cont'){
                            $lg('1801::cl::bgo',cl);
                          }*/
                          //进一步细分，w:30% 代表 width:30%
                          if( /\s|^([a-z]+)\:([\w%\-'"]+)\s|$/i.test( cl ) ){;
                            cl = cl.replace(/\u0020{1,}/g,' ');//merger spaces
                            let cla = cl.split(' ');
                            let clz = '';
                            for( let s of cla ){
                              let rst = s.match(/([a-z]+)\:([\w%\-'"]+)/i);
                              if( rst ) {
                                css.push( { k:rst[1], v:rst[2] });
                                clz += s.replace(':','-').replace('%','pc') + ' ';
                              }else{
                                clz += s + ' ';
                              }
                            }
                            cl = clz.trim();
                          }
                        }
                        else if(f1 == '!'  ) {
                          ht = a.slice(1);
                          //
                        }
                        else if(f2 == 'i:' ) id = a.slice(2);
                        else if(f3 == 'id:') id = a.slice(3);
                        else if(f2 == 'c:' ) cl = a.slice(2);
                        else if(f3 == 'cl:') cl = a.slice(3);
                        else if(f2 == 'h:' ) ht = a.slice(2);
                        else if(f3 == 'ht:') ht = a.slice(3);
                       //else if(f2 == 't:' ) text = a.slice(2);
                        else if(f2 == 's:' ) src  = a.slice(2);
                        else if(f2 == 't:') type  = a.slice(2);
                        else if(f3 == 'ty:') type  = a.slice(3);
                        
                        else{
                          if(tag === 'a'){
                            e = this._html.handle.a(e,...args);
                
                          }else{
                                 if(i  ==  0  ) {cl = a;}
                            else if(i  ==  1  ) {id = a;}
                            else if(i  ==  2  ) {ht = a;}
                          }
                        };
                    }else if( t === 'array'  ){
                        //eventArr
                        eveArr = a;
                    }else if( t === 'number' ){
                        //$lg('1610::number::a',a);
                        let iid = a;
                        add = (docElm)=>{
                            (this.toa[iid]).appendChild(docElm);
                            this.object = (this.toa[iid]).lastChild;
                            //$lg('1615::this.object::bgo',this.object);
                            //$lg('1616::innerHtml:',(this.toa[iid]).innerHTML);
                        }
                    }else if( t === 'null' ){
                        //$lg(`1376::t === 'null'`);
                        add = (docElm)=>{
                            (this.toa[0]).appendChild(docElm);
                            this.object = (this.toa[0]).lastChild;
                        }
                    }else{
                    }
                }
                
                
                    
                this.elm.idcl(id,cl,e);
                this.elm.html(ht,e);
                
                //handle css
                this._html.handle.css( css );
                
                if(type)e.setAttribute('type',type);
                if(src)e.setAttribute('src',src);
                
                ppts.forEach((obj)=>{
                  if(obj.keys != null){
                    (obj.keys).forEach((key)=>{
                      if(obj[key])Reflect.set(e,obj[key],val);})
                  }
                });
                if(eveArr) e = Doc.bindEvent(e,eveArr);
                
                e.setAttribute('data-ajs-idx',Html.didx);
                Html.didx++;
                    
                add(e);
                
                return this;
            },
            
            css : ( arr )=>{
              
                Css.root = 'Ajs/single';
                
                for( let obj of arr ){
                  
                  const [k,v] = [ obj.k, obj.v ];
                  
                  let val = v.replace('%','pc').replace(/\-/g,' ');
                  let slt = v.replace('%','pc');
                  
                  if( Doc.api.query( `.Ajs .single .${k}-${slt}` )) continue;
                  
                  let cs = new Css();
                  
                  let key = Reflect.get( cs._css.abbr, k );
                  //$lg('ajs:1983::',key);
                  if( key == undefined ) key = k;
                  
                  let oo = new Object();
                  
                  Reflect.set( oo, key , val )
                  
                  new Css(`.${k}-${slt}`,oo);
                  
                }
                Css.root = 'Ajs';
            },
            
            a    : (docElm,...args)=>{
                let [i,hr,ht,tg] = [-1,null,null,null];
                const f = (a,n) =>{
                    if(n == 1) return a.charAt(0);
                    else if(n > 1)return a.slice(0,n-1);
                } 
                for(let a of args){
                    i++;
                    let t = Ajs.type(a);
                    if      ( t === 'string' ){
                        const [f1,f2,f3,f4,f5] = [f(a,1), f(a,3), f(a,4), f(a,5), f(a,6)];
                        //$lg('1852::bgb',a,f1,f2,f3,f5,f6);
                             if(f1 == '_'  ) tg  = a;
                        else if(f2 == 'u:' ) hr  = a.slice(2);
                        else if(f2 == './' ) hr  = a.slice(2);
                        else if(f3 == '../') hr  = a.slice(3);
                        else if(f3 == 'hr:') hr  = a.slice(3);
                        else if(f4 == 'http')  hr = a;
                        else if(f5 == 'https') hr = a;
                        else if(i  ==  0  ) hr  = a;
                        else if(i  ==  1  ) tg  = a;
                        else if(i  ==  2  ) ht  = a;
                        else;
                    }else;
                }
                if(hr) docElm.setAttribute('href',hr);
                if(tg) docElm.setAttribute('target',tg);
                if(ht) docElm.innerHTML = ht;
                return docElm;
            },
            
            attr : ()=>{
              
            },
            
        },
        
        fgAdd     :   (it)=>{
    
            it.setAttribute('data-ajs-idx',Html.didx);

            if(this.topObject != undefined && it != undefined){
                
                let t = this.topObject.type;
                if( t == undefined ) {
                    //DocElm
                    //$log.lgg(`'${this.topObject.innerHTML}'`);
                    //$log.lgg(`'${this.topObject.id}'`);
                    
                    this.topObject.appendChild(it);
                    //this.object = it;
                    this.object = this.topObject.lastChild;
                }else if( t == 'frags') {
                    
            
                }else if( t == 'frag') { 
                    
                    this.topObject.addElm(it);
                    this.object = this.topObject.lastElm();
                    
                }
              
                if(this.inValid(this.object)){
                    //this.badMsg('fgAdd');
                    //
                }
              
                if(this.stepTopMode){
                    this.topObject = this.object;
                }
              
            }else{
                //alert('1698.fgAdd:\nthis.topObject == undefined || it == undefined');
            }
            Html.didx++;
            this.lastExec = 'fgAdd';
            return this;
        },
        
        //#eve
        eve       :   (callback,pop,event,mode)=>{
            //$lg('1974::this.object::bgo',Ajs.objType(this.object) ,Ajs.objType(this.object) == 'NodeList');
            if(Array.isArray(this.object) || Ajs.objType(this.object) == 'NodeList'){
            //if(Ajs.objType(this.object) == 'NodeList'){
              for(let obj of this.object){
                if(mode == 1)obj.addEventListener( event, callback, pop );
                else Reflect.set(obj,`on${event}`,callback,pop);
              }
            }else{
              //$lg('1981::this.object::bgo',Ajs.objType(this.object));
              //$lg('1982::callback',callback.toString());
              if(mode == 1) this.object.addEventListener( event, callback, pop );
              else Reflect.set(this.object,`on${event}`,callback,pop);
            }
            
            return this;
          
        },
        
        //#reset
        reset     :   ()=>{
            this.frags      = this._html.obj.frags();
            this.topObject  = undefined;
            this.object     = undefined;
            this.toa        = [];
            Html.didx++;
            return this;
        },
  
        setIdx    :   (docNode)=>{
            if(!docNode){
                alert(`ajs:html:2133::docNode can't be null`);
                return this;
            }
            docNode.setAttribute('data-ajs-idx',Html.didx);
            Html.didx++;
            let all = docNode.querySelectorAll('*');
            for(let a of all){
                if( a.nodeType > 1 ) continue;
                a.setAttribute('data-ajs-idx',Html.didx);
                Html.didx++;
            }
            return this;
        },
  
        //##autoDefine
        autoDefine :  ()=>{
            
            let tags = this._html.tags.all;
            for(let tag of tags ){
                Reflect.defineProperty(Html.prototype,tag,{
                    name  : tag,
                    value : function(...args){
                        return this._html.handle.tag(tag,...args);
                    },
                    enumerable : true,
                })
            }
        }
        
    }

}



//@ui
export class Ui extends Html{
    
    constructor(prefix = 'ajs-ui'){
        super();
        this.h  = new Html();
        this.cs = new Css();
        this.p;
        this.prefix = prefix;
        if(window.$lg == undefined){
            //new Log();
        }
        
    }
    
    css = {
      btn : ()=>{
          if(Doc.api.query('#cssBtn'))return this;
          let cs = new Css();
              cs.style(['cssAjs','cssUi','cssCom','cssBtn'])
                  .slt('.btn')
                      .f.fs('4vmin').ds()
                      .a.mar('10px').pad('10px')
                        .padd.lr('20px')
                        .bord.rad('10px')
                        .bor('0px solid '+cs.rgba.white(1,0.96))
                        .bg('0px solid '+cs.rgba.white(1,0.96));
                        //.bgd.tsp()
              cs.ok();
          return this.css;
      },
      
      pan : ()=>{
          if(Doc.api.query('#cssPan'))return this;
          let cs = new Css();
              cs.style(['cssAjs','cssUi','cssCom','cssPan'])
                  .slt('.pan')
                      
                      .a.mar('10px').pad('10px')
                        .bord.rad('10px')
                        //.bor('0px solid '+cs.rgba.white(1,0.96))
                        .bg(cs.rgba.white(1,0.96));
                        //.bgd.tsp()
              cs.ok();
          return this.css;
      },
      
      all : ()=>{
        
        Ajs.runAll(this.css);
        return this.css;
        
      }
      
    }
    
    spmenu       = class{
      
      constructor(){
        
        this.pars = {
          
          root       : 'body',
          id         : 'spmenu'+parseFloat(parseFloat(Math.random()).toFixed(3))*1000,
          bg         : (new Css()).rgba.white(1,0.9),
          top        : '100px',
          bottom     : null,
          left       : null,
          right      : '100px',
          width      : '93%',
          height     : 'auto',
          openTime   : '1s',
          closeTime  : '1s',
          rad        : '15px',
          pad        : '6px',
          bor        : '6px solid black',
          zidx       : null,
          
        }
        
      }
      
      conf = {
        
        root        : (val)=>{ this.pars.root = val;      return this.conf;},
        id          : (val)=>{ this.pars.id = val;        return this.conf;},
        bg          : (val)=>{ this.pars.bg = val;        return this.conf;},
        top         : (val)=>{ this.pars.top = val;       return this.conf;},
        bottom      : (val)=>{ this.pars.bottom = val;    return this.conf;},
        left        : (val)=>{ this.pars.left = val;      return this.conf;},
        right       : (val)=>{ this.pars.right = val;     return this.conf;},
        width       : (val)=>{ this.pars.width = val;     return this.conf;},
        height      : (val)=>{ this.pars.height = val;    return this.conf;},
        openTime    : (val)=>{ this.pars.openTime = val;  return this.conf;},
        closeTime   : (val)=>{ this.pars.closeTime = val; return this.conf;},
        rad         : (val)=>{ this.pars.rad = val;       return this.conf;},
        pad         : (val)=>{ this.pars.pad = val;       return this.conf;},
        bor         : (val)=>{ this.pars.bor = val;       return this.conf;},
        zidx        : (val)=>{ this.pars.zidx = val;      return this.conf;},
        done        : (val)=>{ return this.done();},
        
      }
      
      into = (anyStr)=>{
        return this.conf.root(anyStr);
      }
      
      done = ()=>{
        
        this.css.all();
        
        this.htm();
        
        return this;
        
      }
      
      css = {
              
        menu  : ()=>{
            let p     = this.pars;
          
            let id    = p.id;
            let cs = new Css();
            cs.style(['cssAjs','cssUi','cssSpreadMenu',`css.spread-menu`])
              .slt('.spread-menu')
                  .overflow_y('scroll')
                  .f.fix().blk().ds()
                  .flex.col.p(8050)
                  .ds();
            cs.style(['cssAjs','cssUi','cssSpreadMenu',`css#${id}`])
              .slt('#'+id)
                  .overflow_y('scroll')
                  .a.wh( p.width,p.height )
                    .max.h( '86%' )
                    //.ovfl.y.scl( )
                    .tr( p.top,p.right )
                    //.bgd.tsp( )
                    .bg( p.bg )
                    .bord.rad( p.rad )
                    .bor(  p.bor )
                    .pad( p.pad )
                    .ds();
              if(p.left)    cs.left(p.left);
              if(p.bottom)  cs.bottom(p.bottom);
              if(p.zidx!=null)  cs.z_index(p.zidx);
              
              cs.slt(`#${id} .spread-line,#${id} .spread-box`)
                  .a.h( 'auto' ).ds()
              
              cs.slt('.spmenu-now-spread')
                    .a.ani(`ajs-menu-spread ${p.openTime} ease forwards`).ds()
              .slt('.spmenu-now-shrink')
                    .a.ani(`ajs-menu-shrink ${p.closeTime} ease forwards`).ds();
              
              
              cs.ok();
            return this.css;
        },
        
        ani   : ()=>{
            let cs = new Css();
            cs.style(['cssAjs','cssUi','cssSpreadMenu','css_Ani'])
              .kf('ajs-menu-spread')
                  .pc(  0).a.wh('70px','70px')
                            .opc(0.6)
                            .bord.rad('35px').ds()
                  .pc( 99).a.wh('93%','70px')
                            .bord.rad('35px').ds()  
                  .pc(100).a.wh('96%','auto')
                            .opc(1)
                            .bord.rad('35px').ds()
              .kf('ajs-menu-shrink')
                  .pc(  0).a.wh('96%','70px')
                            .opc(1)
                            .bord.rad('35px').ds()
                  .pc( 50).a.wh('70px')
                            .bord.rad('35px').ds()
                  .pc(100).a.wh('70px')
                            .opc(0.6)
                            .bord.rad('50%').ds()
              
              .ok();
            return this.css;
        },
        
        other : ()=>{
            let cs = new Css();
            cs.style(['cssAjs','cssUi','cssSpreadMenu','cssOther'])
              .slt('.spread-box-hide')
                  .a.dsp.no().ds()
              .slt('.spread-box-show')
                  .a.dsp.flx().ds()
              
              .ok();
            return this.css;
        },
        
        all   : ()=>{
          
          Ajs.runAll(this.css,['all']);
          return this;
          
        },
        
        
      }
      
      htm = ()=>{
          let p     = this.pars;
          let root  = p.root;
          let id    = p.id;
          let h = new Html();
          h.dom(root)
            .div(`#${id}`,'.spread-menu').top()
                .data('next','shrink')
                .on.click(this.event.spClick,0)
                .on.aniEnd(this.event.spAniEnd,0)
                .div('.spread-box spread-box-show')
            .ok();
          
          return this;
      }
      
      event = {
              
        spClick   : (e)=>{
            //$lg('190::menuClick::bgg');
            let p  = this.pars;
            let id = p.id;
            let ds = e.target;
            //$lg('ajs::234::',ds.id,ds.className);
            if(ds.classList.contains('spread-menu') == false)return;
            let val = ds.getAttribute('data-ajs-next');
            //$lg('ajs::2280::',val);
            if(val == 'shrink'){
                let box = Doc.api.query(`#${id}>.spread-box`);
                    box.classList.remove('spread-box-show');
                    box.classList.add('spread-box-hide')
                ds.classList.remove('spmenu-now-spread');
                ds.classList.add('spmenu-now-shrink')
            }
            let fn = Reflect.get(this.fn,val);
            if(fn)fn();
            return this;
        },
        
        spAniEnd  : (e)=>{
            //$lg('228::bgb','MenuAniEnd');
            //return;
            let p  = this.pars;
            let id = p.id;
            let ds = e.target;
            let next = ds.getAttribute('data-ajs-next');
            //$lg('::action',val);
            //Reflect.get(this.ui.spreadMenu.action,val)();
            if( next == 'spread'){
                //$lg('259::bgo','shrink end');
                /*ds.classList.remove('action-shrink');
                ds.style.width = '70px';
                ds.style.height = '70px';
                ds.style.borderRadius = '50%';
                */
            }else if( next == 'shrink'){
                //$lg('265::bgo','spread end');
                /*ds.classList.remove('action-spread');
                ds.style.width = '96%';
                ds.style.height = 'auto';
                ds.style.borderRadius = '16px';*/
                let box = Doc.api.query(`#${id} .spread-box`);
                    box.classList.remove('spread-box-hide');
                    box.classList.add('spread-box-show');
          
            }
            return this;
        },
        
      }
      
      fn = {
              
        spread : ()=>{

            let obj = document.getElementById(this.pars.id);
                obj.classList.remove('spmenu-now-shrink');
                obj.classList.add('spmenu-now-spread');
                obj.setAttribute('data-ajs-next','shrink');

            return this;
        },
        
        shrink : ()=>{
            $lg('2338::shrink');
            let box = Doc.api.query(`#${this.pars.id}>.spread-box`);
                box.classList.remove('spread-box-show');
                box.classList.add('spread-box-hide');
            $lg('2342::shrink',box.className);
            let obj = document.getElementById(this.pars.id);
                obj.classList.remove('spmenu-now-spread');
                obj.classList.add('spmenu-now-shrink');
                obj.setAttribute('data-ajs-next','spread');

            return this;
        },
        
        dsp    : (anyStr,cl=['hide','show'],objs=(Doc.api.queryAll(anyStr)))=>{
            //$lg('ajs::2352::dsp');
            objs.forEach((obj)=>{
              //if(obj.className.indexOf('AB-list-box')>-1)$lg('269::className::bgo',obj.className);
              obj.classList.remove(`line-${cl[0]}`);
              obj.classList.add(`line-${cl[1]}`);
            })
        },
        
        turn   : (anyStr)=>{
            //$lg('ajs::2352::dsp');
            let objs = Doc.api.queryAll(anyStr);
            if(objs == null) return;
            objs.forEach((obj)=>{
              //if(obj.className.indexOf('AB-list-box')>-1)$lg('269::className::bgo',obj.className);
              if(obj.classList.contains(`line-hide`))obj.classList.remove(`line-hide`);
              else obj.classList.add(`line-hide`);
            })
        },
        
        
      }
      
    }
    
    slider       = class{
      
        constructor(){
            if(window.readyStateChangeList == undefined){
                window.readyStateChangeList = [];
                document.onreadystatechange = ()=>{
                    //if(document.readyState == 'complete'){
                        for(let fn of window.readyStateChangeList){
                            if(fn)fn();
                        }
                    //}
                }
            }
            this.para = {
                into  : 'body',
                open  : null,
                tit   : '',
                pos   : 'L',//L,R,M
                min   : '0px',
                max   : '100%',
                h     : '100%',
                t     : '0px',
                pfix  : 'ajs',
                id    : 'ajs-slider',
                cl    : 'ajs-slider',
                bg    : 'yellow',
                bord  : 0,
                level : 12,
                opc   : 0.9,
                time  : 0.4,
                fsize : 10,
                id_   : 'ajs-slider',
                cl_   : 'ajs-slider',
                name  : 'slider',
                afterOpen  : null,
            }
        }
        
        conf    = {
            into   : (anyStr)=>{this.para.into = anyStr; return this.conf;},
            open   : (anyStr)=>{this.para.open = anyStr; return this.conf;},
            openby : (anyStr)=>{this.para.open = anyStr; return this.conf;},
            afterOpen : (callback)=>{this.para.afterOpen = callback; return this.conf;},
            min    : (strVal)=>{this.para.min  = strVal; return this.conf;},
            max    : (strVal)=>{this.para.max  = strVal; return this.conf;},
            h      : (strVal)=>{this.para.h    = strVal; return this.conf;},
            top    : (strVal)=>{this.para.t    = strVal; return this.conf;},
            id     : (strVal)=>{this.para.id   = strVal; return this.conf;},
            cl     : (strVal)=>{this.para.cl   = strVal; return this.conf;},
            pos    : (strVal)=>{this.para.pos  = strVal; return this.conf;},
            title  : (strVal)=>{this.para.tit  = strVal; return this.conf;},
            border : (strVal)=>{this.para.bord = strVal; return this.conf;},
            bg     : (strVal)=>{this.para.bg   = strVal; return this.conf;},
            opc    : (val)=>{   this.para.opc  = val;    return this.conf;},
            level  : (val)=>{   this.para.level = val;   return this.conf;},
            time   : (val)=>{   this.para.time  = val;   return this.conf;},
            fsize  : (val)=>{   this.para.fsize = val;   return this.conf;},
            //upid   : ()=>{let p = this.para;p.id = p.id == '' ? `${p.pfix}-${p.name}` : `${p.id}`;},
            //upcl   : ()=>{let p = this.para;p.cl = p.cl == '' ? `${p.pfix}-${p.name}` : `${p.cl}`;},
            done   : ()=>{return this.done();},
            ds     : ()=>{return this;},
        }
        
        into    = (anyStr)=>{
            return this.conf.into(anyStr);
        }
        
        done    = ()=>{
            //$lg(`1879::ui.slider.done() start::bgg`);
            return new Promise((res)=>{
                let id = this.para.id;
                /*window.readyStateChangeList.push(()=>{
                    if(document.readyState !== 'complete')return;
                    $lg(`1883::document.readyState == completeid,id::bgg`,id);
                    if(document.querySelector(`#${id}`)){
                        $lg(`1885::#${id} exists::bgg`,Log.now());
                        res();
                    }
                });*/
                let p = this.para;
                this.html(p.into);
                this.css.all();
                this.event.setup();
                res();
            });
        }
        
        html    = ()=>{
            let p  = this.para;
            let id = `${p.id}`;
            let cl = `${p.cl}`;
            let h  = new Html();
            //h.demo('test-ui-slider')
            h.dom(p.into)
                .div(cl,id).top()
                    .div(`.${cl}-caption`).as(1)
                        .div(`.${cl}-title`,`!${p.tit}`,1)
                        .div(`.${cl}-close`,`!\u22A0`,1)
                    .div(`#${id}-content`,`.${cl}-content`)
             .ok();
            return this;
        }
        
        css     = {
            slider  : ()=>{
          
                let p  = this.para;
                let id = `${p.id}`;
                let cl = `${p.cl}`;
                let h = p.h;
                let t = p.t;
                let cs = new Css();
                let bg  = cs.rgba.get(`${p.bg}`,`${p.level}`,`${p.opc}`);
                let bor = cs.rgba.get(`${p.bg}`,0,1);
                let ppt = this.fn.tsiPPT(p.pos);
                cs.style(['cssAjs','cssUi','cssSlider',`css#${id}`])
                  .slt(`#${id}`)
                    .f.fix().ds()
                    .flex.col.p(8)
                    .a.wh('0',h)
                      .top(t)
                      .bg(bg)
                      .mar('6px')
                      .bor(`${p.bord} solid ${bor}`)
                      .tsi(`${ppt} ${p.time}s ease`)
                      .fnt.size(`${p.fsize}vmin`);
                if('L' == p.pos.toUpperCase()) cs.a.tl('0',  '0');
                if('R' == p.pos.toUpperCase()) cs.a.tr('0',  '0');
                cs.ok();
            },
            caption : ()=>{
                
                let p  = this.para;
                let id = `${p.id}`;
                let cl = `${p.cl}`;
                let cs = new Css();
                cs.dom(`.cssAjs .cssUi .cssSlider`)
                  .style('cssCaption').slt(`.${cl}-caption`)
                    //.f.rel().ds()
                    //.flex.row.p(46)
                    .a.wh('100%','auto')
                      .pad('6px')
                      .dsp.no()
                      .pos.sti()
                    .ds()
                    .ok();
            },
            title   : ()=>{
                
                let p  = this.para;
                let id = `${p.id}`;
                let cl = `${p.cl}`;
                let cs = new Css();
                cs.dom(`.cssAjs .cssUi .cssSlider`)
                  .style('css_Title').slt(`.${cl}-title`)
                    .f.rel().tac().ds()
                    //.flex.row.p(5)
                    .a.wh('100%','auto').top('20px').rig('20px')
                      .pad('3px')
                      
                    .ds()
                    .ok();
            },
            close   : ()=>{
                
                let p  = this.para;
                let id = `${p.id}`;
                let cl = `${p.cl}`;
                let cs = new Css();
                let bg  = cs.rgba.get(`${p.bg}`,`${p.level}`,`${p.opc}`);
                cs.dom('.cssAjs .cssUi .cssSlider')
                  .style('css_Close').slt(`.${cl}-close`)
                      .f.abs().ds()
                      .flex.col.p(5)
                      .a.wh('70px','70px').top('20px').rig('20px')
                        .mar('20px')
                        .pad('2px')
                        .bor('3px solid white')
                        .bg( bg )
                        .clr('black')
                        .fnt.size('10vmin')
                        .ds()
                  .ok();
            },
            content : ()=>{
              
                let p  = this.para;
                let id = `${p.id}`;
                let cl = `${p.cl}`;
                let cs = new Css();
                cs.dom(`.cssAjs .cssUi .cssSlider`)
                  .style('cssContent').slt(`.${cl}-content`)
                    .f.rel().ds()
                    .flex.col.p(8)
                    .a.wh('100%','auto')
                    //.vis.no()
                    .dsp.no()
                    .ds()
                    .ok();
            },
            all     : ()=>{
                let fs = Reflect.ownKeys(this.css);
                //
                for(let f of fs){
                    if(f == 'all')continue;
                    Reflect.get(this.css,f)();
                }
                //this.app.css.body().box();
                return this;
            },
        }
        
        event   = {
          
            open  : (e)=>{
                //$lg('2311::ajs::ui::slider::event::open')
                return new Promise((res)=>{
                    let p = this.para;
                    let id = `${p.id}`;
                    let cl = `${p.cl}`;
                    
                    //h.docu.query(`#${p.id} .${p.cl}-close`).style.visibility = 'visible';
                    
                            
                    if(p.id){
                      //$lg('2327::id',id);
                      (new Html()).doc.query(`#${id}`).on.tsiEnd((e)=>{
                        let ds = e.target;
                        //$lg('2312::id,cl',ds.id,ds.className);
                        let tit = Doc.api.query(`#${id} .${cl}-caption`);
                            tit.style.display = 'block';
                            //tit.style.zIndex = 100;
                        let cont = Doc.api.query(`#${id} .${cl}-content`);
                        //let cont = Doc.api.query(`#${id}`);
                            //cont.style.visibility = 'visible';
                            cont.style.display = 'flex';
                            //cont.style.zIndex = 100;
                        if(p.afterOpen) p.afterOpen();
                        
                        //$lg('2659::ajs::ui::slider::event::open::res()::bgg')                        
                        res();
                        //$lg('2332::res');
                      },0);
                    }else{
                      res();
                      //$lg('2335::res');
                    }
                    
                    let sld = Doc.api.query(`#${id}`);
                       
                        sld.style.display = 'flex';
                        this.fn.setVal(sld.style,p.max);
                        
                })
            },
            
            close : (e)=>{
                return new Promise((res)=>{
                  //$lg('2317::slider::close');
                  //$lg('2318::id,e.target.className',e.target.id,e.target.className);
                    let p = this.para;
                    let id = `${p.id}`;
                    let cl = `${p.cl}`;
                    let sld = Doc.api.query(`#${id}`);
                    //sld.style.display = 'none';
                    this.fn.setVal(sld.style,p.min);
                    
                    
                    if(p.id){
                      //$lg('2327::id',id);
                      (new Html()).doc.query(`#${id}`).on.tsiEnd((e)=>{
                        
                    /*let tit = Doc.api.query(`#${id} .${cl}-caption`);
                        tit.style.display = 'none';*/
                        //tit.style.zIndex = -1;
                    
                    //let cont = Doc.api.query(`#${id} .${cl}-content`);
                        let cont = Doc.api.query(`#${id}`);
                            cont.style.display = 'none';
                        //cont.style.visibility = 'none';
                        //cont.style.zIndex = -1;
                        
                        res();
                      },{once:1})
                    }else{
                      res();
                      //$lg('2335::res');
                    }
                })
            },
            
            setup : ()=>{
                //$lg('1918::event.setup::bgg');
                let p = this.para;
                let id = `${p.id}`;
                let cl = `${p.cl}`;
                //if(id != 'sliderMenu')alert('ajs::2339::id,cl:'+id+','+cl);
                let h = new Html()
                let sld = h.docu.query(`#${id}`);
                //$lg('1924::sld::bgo',sld.id,sld.className);
                this.fn.setVal(sld,p.min);
                //$lg('1926::after::setVal');
                if(p.open){
                    let open = document.querySelector(p.open);
                    //$lg('1927::p.open,open',p.open,open);
                    open.onclick = this.event.open;
                }
                let close = document.querySelector(`#${id} .${cl}-close`);
                    //$lg('2348::anyStr',`#${id} .${cl}-close`);
                    //$lg('2349::slider-close',`'${close.id}'`,`'${close.className}'`);
                    close.addEventListener('click',this.event.close);

                return this;
            },
            
        }
        
        fn      = {
            tsiPPT : (pos)=>{
                let d = {
                   L : 'width',
                   R : 'width',
                   M : 'height'
                }
                return Reflect.get(d,pos.toUpperCase());
            },
            
            setVal : (obj,val,ppt=null)=>{
                    let p = this.para;
                    if(!ppt)ppt = this.fn.tsiPPT(p.pos);
                    //$lg('2026::ppt',ppt);
                    Reflect.set(obj,ppt,val);
            },
        }
        
    }
    
    fileEx       = class{
        constructor(){
            if(window.readyStateChangeList == undefined){
                window.readyStateChangeList = [];
                document.onreadystatechange = ()=>{
                    //if(document.readyState == 'complete'){
                        for(let fn of window.readyStateChangeList){
                            if(fn)fn();
                        }
                    //}
                }
            }else{
                //window.AjsStateChangeList
                
            }
            this.pars = {
                into    : 'body',
                openBy  : null,
                dsp     : 'no',
                id      : 'ajs-fileEx',
                pfix    : 'ajs-fileEx',
                closeBy : '.ajs-fileEx-close',
                addr    : '',
            };
            this.pidx = -1;
            //this.pdat = [];
        }
        conf   = {
            id      : (str/*querySelector no#*/)=>{
                this.pars.id = str;
                return this.conf;
            },
            pfix    : (str/*querySelector no#*/)=>{
                this.pars.id = str;
                return this.conf;
            },
            into    : (anyStr/*querySelector*/)=>{
                this.pars.into = anyStr;
                return this.conf;
            },
            dsp     : (anyStr/*yes|no*/)=>{
                this.pars.dsp = anyStr;
                return this.conf;
            },
            openBy  : (anyStr/*querySelector*/)=>{
                this.pars.openBy = anyStr;
                return this.conf;
            },
            closeBy : (anyStr/*querySelector*/)=>{
                this.pars.closeBy = anyStr;
                return this.conf;
            },
            addr    : (str/*handler.php*/)=>{
                this.pars.addr = str;
                return this.conf;
            },
            done    : (...args)=>{
                return this.done(...args);
            },
        }
        into   = (anyStr)=>{
            return this.conf.into(anyStr);
        }
        done   = (...args)=>{
            //$lg('2088::ui::fileEx::done:start',Log.now());
            let str = `#${this.pars.id}`;
            //$lg(' 2090::ui::fileEx::id',str,Log.now());
          
            return new Promise((res)=>{
                //$lg('2093::ui::fileEx::Promise::bgy','before::onreadystatechange','document.readyState:',document.readyState);
                  
                window.readyStateChangeList.push(()=>{
                    if(document.readyState !== 'complete')return;
                    $lg('2109::fileEx::done::bgy',document.readyState,str,Log.now());
                    if(document.querySelector(str)){
                        $lg('2111::fileEx::done::resolve::bgg',str+' exists',Log.now());
                        res();
                    }else{
                        $lg('2114::fileEx::done::not resolve::bgo',str+' not exists',Log.now());
                    }
                })
                /*
                document.onreadystatechange = ()=>{
                    if(document.readyState == 'complete'){
                        $lg('2097::fileEx::done::bgy',document.readyState,str,Log.now());
                        if(document.querySelector(str)){
                            $lg('2099::fileEx::done::resolve::bgg',str+' exists',Log.now());
                            res();
                        }else{
                            $lg('2083::fileEx::done::not resolve::bgo',str+' not exists',Log.now());
                        }
                    }
                }*/
                this.css.all();
                this.htm.frame();
                this.event.all();
                this.page.start.init();
                //$lg('2108::ui::fileEx::Promise end::bgy');
               
            })
        }
        htm    = {
            frame : (res)=>{
                $lg('2096::frame() start::bgb',Log.now());
                let p = this.pars;
                let h = new Html();
                    h.dom('body')
                        .div(`#${p.id}`).top()
                            .div('.menu rel row-46').as(1)
                                .div('.m1 row-5',1).as(11)
                                    .span('.folder icon',`!\u2630`,11)
                                .div('.lbox',1)
                                .div('.m3 col-5',1).as(13)
                                    .span('.close icon','!\u2612',13)
                            .div('.path rel row-46').as(2)
                                .div('.pbox row-4',2)
                                .div('.btn row-5',`!\u25bc`,2)
                            .div('.list rel col-7040').as(3)
                            .div('.tool rel col-7040').as(4)
                                .div('.tline-1 row-46',4).as(14)
                                    .div('.tbox row-4050',14).as(24)
                                        .span('.icon',24).copy(7)
                                    .span('.btn row-46',`!\u25b2`,14)
                                .div('.tline-2 tbox row-4050',4).as(34)
                                    .span('.icon',34).copy(7)
                        .ok();      
                        $lg('2096::frame() finish::bgb',Log.now());
                return this;
            },
            addListItem : ()=>{
              
            },
        }
        css    = {
            frame   : ()=>{
              try{
                //$lg('2149::css::frame()::bgg');
                let cs = new Css();
                cs.style(['cssAjs','cssUi','cssFileEx'])
                  .slt('#fileEx')
                      .f.abs().blk().ds()
                      .flex.col.p(8)
                      .a.wh('98%','99%')
                        .tl('0','0')
                        .bg('white')
                        .bor('6px solid white')
                        .tsi('width height 0.5s ease');
                      if(this.pars.dsp == 'yes')cs.a.vis.yes();
                      if(this.pars.dsp == 'no' )cs.a.vis.no();
                cs.ok();
                return this.css;
              }catch(e){
                //$lg('2164::err::bgo',e.message);
              }
                
            },
            menu    : ()=>{
                //$lg('2164::css::menu()::bgg');
              try{
                let cs = new Css();
                cs.dom('#cssFileEx')
                  .style(['cssMenu','css_menu'])
                      .slt('.menu')
                          .a.wh('99%','100px')
                            .bor('6px solid red').ds()
                      .slt('.m1')
                          .a.wh('7.5%','99%').ds()
                      .slt('.lbox')
                          .a.wh('85%','99%')
                            .mar('6px').pad('6px')
                            .ovfl.x.scl()
                            .ds()
                      .slt('.m3')
                          .a.wh('7.5%','99%').ds()
                      .slt('.label')
                          .a.wh('auto','99%')
                            .mar('6px').pad('6px')
                            .bord.rad('10px')
                            .fnt.size('4vmin').ds()
                      .slt('.fnew')
                          .a.marg.rig('20px').ds()
                      .ok();
                return this.css;
              }catch(e){
                  $lg('2270::err',e.message);
              }
            },
            path    : ()=>{
              try{
                let cs = new Css();
                cs.dom('#cssFileEx')
                    .style('cssPath')
                        .slt('.path')
                            .a.wh('99%','100px')
                              .bor('6px solid yellow').ds()
                        .slt('.pbox')
                            .a.wh('90%','70px')
                              .ovfl.x.scl()
                              .flx.wrap.yes()
                              .bor('3px solid red').ds()
                        .slt('.pathCell')
                            .a.mar('6px').pad('6px')
                              .bor('1px solid black')
                              .fnt.size('4vmin')
                              .bord.rad('6px').ds()
                        .slt('.spcode')
                              .a.fnt.size('4vmin')
                              .ds()
                            .ok();
                return this.css;
              }catch(e){
                $lg('2282::bgo',e.message);
              }
            },
            list    : ()=>{
                let cs = new Css();
                cs.dom('#cssFileEx')
                    .style('cssList')
                        .slt('.list')
                            .a.wh('99%','76%')
                              .bor('6px solid blue')
                              .ovf.scl()
                              .ds()
                            .ok();
                return this.css;
            },
            tool    : ()=>{
                let cs = new Css();
                cs.dom('#cssFileEx')
                  .style(['cssTool','css_tool'])
                      .slt('.tool')
                          .a.wh('99%','100px')
                            .bor('6px solid green').ds()
                  .style('css_line')
                      .slt('.tline-1')
                      .slt('.tline-2')
                          .a.vis.no().ds()
                      .slt('.tbox')
                          .a.wh('90%','70px')
                            .ovfl.x.scl()
                            .flx.wrap.yes()
                            .bor('3px solid red').ds()
                      .ok();
                return this.css;
            },
            flex    : ()=>{
                let cs = new Css();
                cs.dom('#cssFileEx')
                  .style('cssFlex')
                  .slt('.col-4')
                      .flex.col.p(4).ds()
                  .slt('.col-5')
                      .flex.col.p(5).ds()
                  .slt('.row-4')
                      .flex.row.p(4).ds()
                  .slt('.row-5')
                      .flex.row.p(5).ds()
                  .slt('.row-46')
                      .flex.row.p(46).ds()
                  .slt('.row-4050')
                      .flex.row.p(4050).ds()
                  .slt('.row-7080')
                      .flex.row.p(7080).ds()
                  .slt('.col-7040')
                      .flex.row.p(7040).ds()
                  .ok();
                return this.css;
            },
            page    : ()=>{
               //$lg('2246::css::other()::bgg');
                let p = this.pars;
                let cs = new Css();
                cs.dom('#cssFileEx')
                  .style('cssPage')
                    .slt('.page')
                        .a.wh('98%','98%')
                          .mar('10px')
                          .pad('10px')
                          .bord.rad('20px')
                          .bor('6px solid red')
                          .ovf.scl()
                          .ds()
                    .slt('.hidden')
                        .a.dsp.no().ds()
                    .slt('.folder,.file')
                        .a.fnt.size('4vmin')
                          .mar('6px')
                          .bg('yellow')
                          .clr('black')
                          .ds()
                    .slt('.file')
                        .a.bg('lightblue').ds() 
                    .slt('.pitem')
                        .a.wh('99%','100px')
                          .mar('3px').pad('3px')
                          .bor('6px solid black').ds()
                    .slt('.iname')
                        .f.tal().ds()
                        .a.fnt.size('4vmin')
                          .wh('99%','99%')
                          .ds()
                    .slt('.btn-root')
                        .f.tac().ds()
                        .a.wh('40%','150px')
                          .mar('20px')
                          .bor('1px solid black')
                          .bord.rad('20px')
                          .bg('white')
                          .fnt.size('8vmin')
                          .ds()
                    .ok();
                return this.css;
            },
            other   : ()=>{
               $lg('2246::css::other()::bgg');
              try{
                let p = this.pars;
                let cs = new Css();
                cs.dom('#cssFileEx')
                  .style('cssOther')
                    .slt('.icon')
                        .f.tac().ds()
                        .a.wh('80px','80px')
                          .fnt.size('6vmin').ds()
                    .slt(`#${p.id} .menu .m3 .close`)
                        .a.fnt.size('7vmin')
                          .padd.bot('16px').ds()
                          //.bor('3px solid red').ds()
                    .slt('.btn')
                        .a.wh('70px','70px')
                          .padd.bot('10px')
                          .fnt.size('6vmin')
                          //.tsf(cs.fn.rotz('270deg'))
                          .bor('3px solid green').ds()
                    .slt('.rel')
                        .f.rel().ds()
                    .ok();
                    $lg('2588::css::other()::finish::bgg');
                return this.css;
              }catch(e){
                $lg('2591::err',e.message);
                  //throw new Error("break",{cause: e});
              }
            },
            all     : ()=>{
                //$lg('2262::css::all::bgg');
                Ajs.runAll(this.css,['all']);
                return this;
            },
        }
        event  = {
            init  : ()=>{
                //$lg('2355::event.init');
                this.fn.hide();
                return this;
            },
            open  : ()=>{
                //$lg('2360::event.open');
                
                let p  = this.pars;
                if(p.openBy == null || p.openBy == '')return;
                let obj = document.querySelector(`#${p.openBy}`);
                    obj.addEventListener('click',(e)=>{
                        this.fn.open();
                    })
            },
            close : ()=>{
                //$lg('2370::event.close');
                let p  = this.pars;
                let obj = document.querySelector(`#${p.id} .m3 .close`);
                    obj.addEventListener('click',(e)=>{
                        //$lg('2366::addEventListener');
                        this.fn.hide();
                    })
            },
            all   : ()=>{
                //$lg('2371::event.all');
                Ajs.runAll(this.event,['all']);
                return this;
            },
            
        }
        fn     = {
            getIdx : ()=>{
              
            },
            show   : ()=>{
                let p  = this.pars;
                let fe = document.querySelector(`#${p.id}`);
                    //fe.style.display = 'flex';
                    fe.style.backgroundColor = 'white';
                    fe.style.visibility = 'visible';
                    fe.style.width = '99%';
                    fe.style.height = '99%';
                return this;
            },
            hide   : ()=>{
                //$lg('2387::fn.hide');
                let p  = this.pars;
                let fe = document.querySelector(`#${p.id}`);
                    //fe.style.display = 'none';
                    fe.style.backgroundColor = 'transparent';
                    fe.style.visibility = 'hidden';
                    fe.style.width = '0%';
                    fe.style.height = '0%';
                return this;
            },
            listFolder : (path)=>{
                //$lg('85::listFolder,path',path);
                let p = this.pars;
                let addr = p.addr;
                let data = {path : path};
                let xhr = new Xhr(addr);
                    xhr.ask('folder__list',data)
                       .rsp((data)=>{
                          $lg('86::dat::bgg',data);
                          let obj = JSON.parse(data);
                          let rst = obj.da.rst;
                          let dat = obj.da.dat;
                          let path  = dat.path;
                          let items = dat.items;
                          //$lg(`2464::path:${path}::bgb`);
                          //this.path.add(path);
                          this.page.add(path,items);
                          /*
                          for(let item of items){
                              let type = item.type;
                              $lg(`${item.name}${(type == 2 ? '::bgy' : '')}`);
                          }*/
                       },(err)=>{
                          $lg('88::err::bgo',err);
                       })
                
                return this.fn;
            },
            
            
        }
        page   = {
            
            start  : {
                init : ()=>{
                    this.page.start.htm();
                    /*this.page.start.event.inside_click('/storage/emulated/0/')
                                         .sdcard_click('/storage/A8FA-F85F/');
                                         */
                    return this;
                },
                htm  : ()=>{
                    let p = this.pars;
                    let id = p.id;
                    let h = new Html();
                    h.dom(`#${id} .list`)
                      .div(`.page rel row-7080`).top()
                        .button('#rInside','.btn-root rel','!内部存储')
                            .on.click(this.page.start.event.inside_click)
                        .button('#rSdcard', '.btn-root rel','!sd卡')
                            .on.click(this.page.start.event.sdcard_click)
                        .ok();
                },
                event : {
                    inside_click : ()=>{
                        //this.path.add(spath);
                        let path = "\/storage\/emulated\/0";
                        this.fn.listFolder(path);
                    },
                    sdcard_click : ()=>{
                        let path = "\/storage\/A8FA-F85F";
                        //this.path.add(path);
                        this.fn.listFolder(path);
                    },
                }
            },
            
            add : (path,arrs)=>{
                let p = this.pars;
                let id = p.id;
                let h = new Html();
                this.pidx++;
                h.dom(`#${id} .list`)
                  .div(`.page rel col-7040`).top()
                      .data('ajs-pidx',this.pidx);
                for(let arr of arrs){
                  
                    if(arr[0] == 0)continue;
                    let type = arr[0];
                    let name = arr[1];
                    
                    let f1 = type == 2 ? 'folder' : `file`;
                    
                    h.div(`.pitem row-4`).as(1)
                        .span(`.${f1}`,`!${f1}`,1)
                        .span(`.iname`,`!${name}`,1)
                            .data('type',type)
                            .on.click(this.page.item_click);
                  
                }
                this.page.hideAll();
                h.ok();
                this.label.add(this.pidx,path);
                this.path.add(path);
            },
            
            item_click : (e)=>{
                $lg('2580::item_click');
                let p = this.pars;
                let pbox = document.querySelector(`#${p.id} .pbox`);
                let path = pbox.getAttribute('data-ajs-path');
                let tar  = e.target;
                let text = tar.innerText;
                let type = tar.getAttribute('data-ajs-type');
                $lg('2587::type',type);
                if(type == '2' && text.length > 0){
                    $lg('2590::path',path);
                    this.fn.listFolder(path+'/'+text);
                }
                return this;
            },
            
            hideAll : ()=>{
                let pgs = document.querySelectorAll('.page');
                for(let p of pgs){
                    p.classList.add('hidden');
                }
                return this;
            },
            
        }
        path   = {
          
            add : (pathStr)=>{
                //$lg('2513::pathStr',pathStr);
                let arr = pathStr.toString().split('/');
                //$lg('2514::arr',arr);
                let p   = this.pars;
                let docPath = document.querySelector(`#${p.id} .pbox`);
                    docPath.innerHTML = '';
                let h = new Html();
                    h.dom(`#${p.id} .pbox`)
                          .data('path',pathStr);
                let [i,j] = [-1,0];
                //let slaCode = '/'.toString().charCodeAt(0);
                let spc = String.fromCharCode(0x2023);//0x2023//27a1,203a
                let uri = '';
                for(let s of arr){
                    //let scode = s.toString().charCodeAt(0);
                    //$lg(`2529::code:'${scode},${slaCode}'::bgo`);
                    //if(scode === slaCode) s = String.fromCharCode(0xbb);//0x2023
                    i++;
                    uri += '/'.repeat(j) + s;
                    j=1;
                    h.span(`#pathCell${i}`,`.pathCell`,`!${s}`)
                          .data('uri',uri).on.click(this.path.cell_click)
                      .span('.spcode',`!${spc}`);
                }
                h.ok();
            },
            
            cell_click : (e)=>{
                let tar = e.target;
                let uri = tar.getAttribute('data-ajs-uri');
                this.fn.listFolder(uri);
            },
            
        }
        label  = {
            add  : (pidx,path)=>{
              
            },
            click : ()=>{
              
            },
        }
    }
    
    grid         = class{
    
      para  =   {
          into  : '#box',
          size  : '20px',
          color : new Css().rgba.yellow(1,0.6),
      }
      conf  =   {
          into  :   (anyStr)=> {
              this.para.into = anyStr;
              return this.conf;
          },
          size  :   (str)=>{
              this.para.size = str;
              return this.conf;
          },
          color :   (str)=>{
              this.para.color = str;
              return this.conf;
          },
          ds    :   ()=>{
              return this;
          },
      }
      html  =   ()=>{
          let p = this.para;
          let h = new Html();
          h.dom(this.para.into).step(1)
                .div('gridBox','grid-box')
                    .div('gridLayerX','grid-layer grid-layer-x').top().step(0)
                        .div('','grid-line-x').copy(58).top('#gridBox')
                    .div('gridLayerY','grid-layer grid-layer-y').top()
                        .div('','grid-line-y').copy(36)
            .ok();
            return this;
      }
      css   =   {
          box     :   ()=>{
              let p = this.para;
              let cs = new Css()
              cs.style(['cssGrid','cssGrid_Box'])
                .slt('.grid-box')
                .f.rel().ds()
                .a.tl(0,0)
                  .wh('100%','100%')
                  .bgd.tsp()
                  .bor('6px solid '+p.color)
                  .ds()
                .ok();
              return this.css;
          },
          layer   :   ()=>{
              let cs = new Css()
              cs.style(['cssGrid','cssGrid_Layer'])
                .slt('.grid-layer')
                    .f.rel().ds()
                    .a.tl(0,0)
                      .wh('100%','100%')
                      .bgd.tsp()
                    .ds()
                .slt('.grid-layer-x')
                    .flex.col.p(8)
                    //.a.bor('6px solid yellowgreen')
                    .a.flx.wrap.yes().ds()
                .slt('.grid-layer-y')
                    .f.abs().ds()
                    .flex.row.p(4)
                    //.a.bor('6px solid fuchsia')
                    .a.flx.wrap.yes().ds()
                .ok();
              return this.css;
          },
          lineX   :   ()=>{
              let p = this.para;
              
              let cs = new Css()
              let up = cs.docu.gbid('gridLayerX')
              let upch = parseInt(up.clientHeight);
              //alert('178::upch::'+upch);
              cs.style(['cssGrid','cssGrid_LineX'])
                .slt('.grid-line-x')
                    .f.rel().ds()
                    .a.bord.bot.val('1px solid '+p.color)
                      .bgd.tsp()
                      .wh('100%',p.size)
                      .tl(0,0)
                      .ds()
                .ok();
              return this.css;
          },
          lineY   :   ()=>{
              let p = this.para;
              let color = p.color;
              let cs = new Css()
              let up = cs.docu.gbid('gridLayerX')
              let upcw = parseInt(up.clientWidth);
              //alert('195::upcw::'+upcw);
             
              cs.style(['cssGrid','cssGrid_LineY'])
                .slt('.grid-line-y')
                    .f.rel().ds()
                    .a.bord.rig.val('1px solid '+p.color)
                      .bgd.tsp()
                      .wh(p.size,'100%')
                      .ds()
                .ok();
              return this.css;
          },
          all     :   ()=>{
            //(new Css).runAll(this.css,['all']);
            this.css.box()
                    .layer()
                    .lineX()
                    .lineY();
                    
            return this;
          },
      }
      add   =   ()=>{
          //super.runAll(this,['para','conf','add']);
          this.html().css.all();
          return this;
      }
      ds    =   ()=>{
          return this;
      }
      
    }
    
    panel        = class{
    
      para  =   {
          into   : 'body',
          width  : '80%',
          height : '80%',
          color  : 'black',
          rad    : '20px',
          bg     : 'white',
          pfix   : 'ajs',
      }
      conf  =   {
          into  :   (anyStr)=> {
              this.para.into = anyStr;
              return this.conf;
          },
          size  :   (str)=>{
              this.para.size = str;
              return this.conf;
          },
          color :   (str)=>{
              this.para.color = str;
              return this.conf;
          },
          ds    :   ()=>{
              return this;
          },
      }
      html  =   ()=>{
          let p  = this.para;
          let id = p.pfix+'Panel';
          let cl = p.pfix+'-panel';
          let h  = new Html();
          h.dom(this.para.into)
                .div(id+'Box',cl+'frame').top()
                    .div(id,cl)
            .ok();
            return this;
      }
      css   =   {
          box     :   ()=>{
              let p = this.para;
              let cs = new Css()
              cs.style(['cssGrid','cssGrid_Box'])
                .slt('.grid-box')
                .f.rel().ds()
                .a.tl(0,0)
                  .wh('100%','100%')
                  .bgd.tsp()
                  .bor('6px solid '+p.color)
                  .ds()
                .ok();
              return this.css;
          },
          layer   :   ()=>{
              let cs = new Css()
              cs.style(['cssGrid','cssGrid_Layer'])
                .slt('.grid-layer')
                    .f.rel().ds()
                    .a.tl(0,0)
                      .wh('100%','100%')
                      .bgd.tsp()
                    .ds()
                .slt('.grid-layer-x')
                    .flex.col.p(8)
                    //.a.bor('6px solid yellowgreen')
                    .a.flx.wrap.yes().ds()
                .slt('.grid-layer-y')
                    .f.abs().ds()
                    .flex.row.p(4)
                    //.a.bor('6px solid fuchsia')
                    .a.flx.wrap.yes().ds()
                .ok();
              return this.css;
          },
          lineX   :   ()=>{
              let p = this.para;
              
              let cs = new Css()
              let up = cs.docu.gbid('gridLayerX')
              let upch = parseInt(up.clientHeight);
              //alert('178::upch::'+upch);
              cs.style(['cssGrid','cssGrid_LineX'])
                .slt('.grid-line-x')
                    .f.rel().ds()
                    .a.bord.bot.val('1px solid '+p.color)
                      .bgd.tsp()
                      .wh('100%',p.size)
                      .tl(0,0)
                      .ds()
                .ok();
              return this.css;
          },
          lineY   :   ()=>{
              let p = this.para;
              let color = p.color;
              let cs = new Css()
              let up = cs.docu.gbid('gridLayerX')
              let upcw = parseInt(up.clientWidth);
              //alert('195::upcw::'+upcw);
             
              cs.style(['cssGrid','cssGrid_LineY'])
                .slt('.grid-line-y')
                    .f.rel().ds()
                    .a.bord.rig.val('1px solid '+p.color)
                      .bgd.tsp()
                      .wh(p.size,'100%')
                      .ds()
                .ok();
              return this.css;
          },
          all     :   ()=>{
            //Ajs.runAll(this.css,['all']);
            this.css.box()
                    .layer()
                    .lineX()
                    .lineY();
                    
            return this;
          },
      }
      add   =   ()=>{
          //super.runAll(this,['para','conf','add']);
          this.html().css.all();
          return this;
      }
      ds    =   ()=>{
          return this;
      }
      
    }
  
    pixelWall    = class{
    
      para  =   {
          into  : '#box',
          size  : '20px',
          rad   : '0px',
          color : new Css().rgba.yellow(1,0.6),
          pfix  : 'pixelWall',
      }
      conf  =   {
          into  :   (anyStr)=> {
              this.para.into = anyStr;
              return this.conf;
          },
          size  :   (str)=>{
              this.para.size = str;
              return this.conf;
          },
          color :   (str)=>{
              this.para.color = str;
              return this.conf;
          },
          ds    :   ()=>{
              return this;
          },
      }
      html  =   ()=>{
          let p = this.para;
          let h = new Htm();
          h.dom(this.para.into).step(1)
                .div('pixelWall','pixelWall')
                    .div('','pixelWall-line').top().step(0)
                        .div('','pixelWall-cell').copy(58)
                    .copy(10,'.pixelWall-line')
                        .into('#pixelWall')
                        .done()
            .ok();
            return this;
      }
      css   =   {
          box     :   ()=>{
              let p = this.para;
              let cs = new Css()
              cs.style(['cssGridBlock','cssGridBlock_Box'])
                .slt('.grid-block-box')
                .f.rel().ds()
                .a.tl(0,0)
                  .wh('100%','100%')
                  .bgd.tsp()
                  .bor('6px solid '+p.color)
                  .ds()
                .ok();
              return this.css;
          },
          layer   :   ()=>{
              let cs = new Css()
              cs.style(['cssGrid','cssGrid_Layer'])
                .slt('.grid-block-layer')
                    .f.rel().ds()
                    .a.tl(0,0)
                      .wh('100%','100%')
                      .bgd.tsp()
                    .ds()
                .slt('.grid-block-layer-x')
                    .flex.col.p(8)
                    //.a.bor('6px solid yellowgreen')
                    .a.flx.wrap.yes().ds()
                .slt('.grid-block-layer-y')
                    .f.abs().ds()
                    .flex.row.p(4)
                    //.a.bor('6px solid fuchsia')
                    .a.flx.wrap.yes().ds()
                .ok();
              return this.css;
          },
          lineX   :   ()=>{
              let p = this.para;
              
              let cs = new Css()
              let up = cs.docu.gbid('gridLayerX')
              let upch = parseInt(up.clientHeight);
              //alert('178::upch::'+upch);
              cs.style(['cssGrid','cssGrid_LineX'])
                .slt('.grid-block-line-x')
                    .f.rel().ds()
                    .a.bord.bot.val('1px solid '+p.color)
                      .bgd.tsp()
                      .wh('100%',p.size)
                      .tl(0,0)
                      .ds()
                .ok();
              return this.css;
          },
          lineY   :   ()=>{
              let p = this.para;
              let color = p.color;
              let cs = new Css()
              let up = cs.docu.gbid('gridLayerX')
              let upcw = parseInt(up.clientWidth);
              //alert('195::upcw::'+upcw);
             
              cs.style(['cssGrid','cssGrid_LineY'])
                .slt('.grid-block-line-y')
                    .f.rel().ds()
                    .a.bord.rig.val('1px solid '+p.color)
                      .bgd.tsp()
                      .wh(p.size,'100%')
                      .ds()
                .ok();
              return this.css;
          },
          all     :   ()=>{
            //(new Css).runAll(this.css,['all']);
            this.css.box()
                    .layer()
                    .lineX()
                    .lineY();
                    
            return this;
          },
      }
      add   =   ()=>{
          //super.runAll(this,['para','conf','add']);
          this.html().css.all();
          return this;
      }
      ds    =   ()=>{
          return this;
      }
      
    }
    
    table        = class{
        
        constructor(arr = null){
            //this.html = new Html();
            this.data = arr;
            this.colArr = null;
            this.datArr = null;
            this.cellClass = null;
            this.pars = {
                id : 'ajs-table',
                cl : 'ajs-table',
                fs : '4vmin',
            }
        }
        
        conf = {
          
          id : (str)=>{this.pars.id = str;return this.conf;},
          
          cellClass : (...clazz)=>{
            
            this.cellClass = Array.from(clazz);
            //$lg('3803::',...this.cellClass);
            return this.conf;
            
          },
          
          col : (arr)=>{
            this.colArr = arr;
            return this.conf;
          },
          
          dat : (arr)=>{
            this.datArr = arr;
            return this.conf;
          },
          
        }
        
        done = (target,op='ok')=>{
          
          
            //$lg('3229::ui.table.done');
            if(target == null && op == 'ok'){
              alert(`if target == null,op should be 'pack'`);
              return this;
            }
            this.css();
            
            let mode = this.data !== null ? 'mixin' : 'apart';
            
            if(op == 'pack'){
              if( mode == 'mixin' ){
                return this.mixinModeOutput(target,op);
              }else{
                return this.apartModeOutput(target,op);
              }
            }else{
              if( mode == 'mixin' ){
                this.mixinModeOutput(target,op);
              }else{
                this.apartModeOutput(target,op);
              }
            }
            return this;
        }
        
        ok = (target)=>{
          return this.done(target,'ok');
        }
        
        pack = ()=>{
          return this.done(null,'pack');
        }
        
        into = (...args)=>{
          return this.done(...args);
        }
        
        css = ()=>{
            if(Doc.has('.Ajs .css_Table')) return this;
            let p = this.pars;
            let cl = p.cl;
            let cs = new Css();
            cs.style(['cssAjs','cssUi','cssTable','css_Table'])
              .slt(`.${cl}`)
                .a.wh('96%','auto')
                  .pos.rel()
                  .ovfl.y.scl().ds()
              .slt(`.${cl},.ajs-th,.ajs-td`)
                .a.clr('white').ds()
                  .fontSize(p.fs)
                  .overflow('scroll')
                  .outline('2px solid white')
                  .border('2px solid gray')
                  .margin('6px')
                  .width('auto')
                  .word_wrap('normal')
                  .a.clr('black').ds()
                  .padding('3px').ds()
              .slt(`.ajs-tr`)
                  .width('auto')
                  .a.bg('lightblue').ds()
              .slt(`.ajs-tr-1`)
                  .a.bg('lightgreen').ds()
              .slt(`.ajs-tr-2`)
                  .a.bg('lightyellow').ds()
                .ok();
            return this;
          
        }
        
        mixinModeOutput = (target=null,op='pack')=>{
            //$lg('3235::ui.table.htm');
          try{
            let id = this.pars.id;
            let cl = this.pars.cl;
            let h = new Html();
            h.dom(target)
              .table(`#${id}`,`.${cl}`).top()
                  .tr('.ajs-tr').as(0);
            let line1 = (this.data)[0];
                if(line1 == null) return this;
            let keys =  Reflect.ownKeys(line1);
                if(keys == null) return this;
            for(let key of keys){
                h.th('.ajs-th',`!${key}`,0);
            }
              
            let i = 0;
            for(let obj of this.data){

                i++;
                h.tr(`.ajs-tr-${i}`).as(0);
                for(let key of keys){
                    let val = Reflect.get(obj,key);
                    //$lg('3248::k,v::bgg',`${key}:${val}`);
                    h.td('.ajs-td',`!${val}`,0);
                }
                if(i >= 2 ) i=0;
            }
            if(op = 'ok'){
                h.ok();
                return this;
            }else 
            if(op = 'pack'){
                return h.pack();
            }
            return this;
          }catch(e){
            $lg('3917::err::bgo',e.message);
          }
        }
        
        apartModeOutput = (target=null,op='pack')=>{
            //$lg('3235::ui.table.htm');
          try{
            let id = this.pars.id;
            let cl = this.pars.cl;
            let h = new Html();
            h.dom(target)
              .table(`#${id}`,`.${cl}`).top()
                  .tr('.ajs-tr').as(0);
            let c = -1;
            for(let a of this.colArr ){
                let clazz = '';
                c++;
                if( this.cellClass && this.cellClass[c].length > 0 ){
                  clazz = ' ' + this.cellClass[c];
                }
                h.th(`.ajs-th${clazz}`,`!${a}`,0);
            }
              
            let i = 0;
            for(let arr of this.datArr){

                i++;
                h.tr(`.ajs-tr-${i}`).as(0);
                let c = -1;
                for(let a of arr){
                    c++;
                    /*let clazz = '';
                    if( this.cellClass && this.cellClass[c].length > 0 ){
                      clazz = ' ' + this.cellClass[c];
                    }*/
                    //$lg('3248::k,v::bgg',`${key}:${val}`);
                    
                    h.td(`.ajs-td`,`!${a}`,0);
                }
                if(i >= 2 ) i=0;
            }
            if(op = 'ok'){
                h.ok();
                return this;
            }else 
            if(op = 'pack'){
                return h.pack();
            }
            return this;
          }catch(e){
            $lg('3956::err::bgo',e.message);
          }
        }

    }
    
    range        = class{
      
        constructor(){
          
            this.pars = {
              
                into  : 'body',
                id    : 'ajs-range',
                cl    : 'ajs-range',
                min   : 0,
                max   : 100,
                val   : 50,
                w     : '96%',
                h     : '16px',
                opc   : 0.7,
                bg    : 'gray',
            }
          
        }
        conf  = {
            into  : (anyStr = 'body')=>{ this.pars.into = anyStr; return this.conf; },
            id    : ( val = 'ajs-range')=>{ this.pars.id = val; return this.conf; },
            cl    : ( val = 'ajs-range')=>{ this.pars.cl = val; return this.conf; },
            min   : ( val = 0)=>{ this.pars.min = val; return this.conf; },
            max   : ( val = 100)=>{ this.pars.max = val; return this.conf; },
            val   : ( val = 50)=>{ this.pars.val = val; return this.conf; },
            w     : ( val = '96%')=>{ this.pars.w = val; return this.conf; },
            h     : ( val = '70px')=>{ this.pars.h = val; return this.conf; },
            bg   : ( val = 'white')=>{ this.pars.bg = val; return this.conf; },
            opc   : ( val = 0.7)=>{ this.pars.opc = val; return this.conf; },
            done  : ()=>{ return this.done();},
        }
        into  = (anyStr='body')=>{
            //$lg('3319::into',anyStr);
            this.pars.into = anyStr;
            return this.conf;
        }
        done  = ()=>{
            //$lg('3324::done');
            this.css.range();
            this.htm();
            return this;
        }
        htm   = ()=>{
            //$lg('3330::htm');
            let p = this.pars;
            let h = new Html();
            h.dom(p.into)
                .input.range(`#${p.id}`,`.${p.cl}`)
                    .at.type('range')
                    .at.min(p.min)
                    .at.max(p.max)
                    .at.value(p.val)
                    
            .ok();
            return this;
          
        }
        css   = {
          
            range : ()=>{
                let p = this.pars;
                let cs = new Css();
                cs.style(['cssAjs','cssUi','cssRange',`css_${p.id}`])
                    .slt(`#${p.id}`)
                        .appearance('none')
                        .width(`${p.w}`)
                        .height(`${p.h}`)
                        .outline('none')
                        .opacity(`${p.opc}`)
                        .background(`${p.bg}`)
                        .color('white')
                        .transition('opacity .2s')
                        .border_radius('10px')
                        .font_size('4vmin')
                        .margin('10px')
                    .slt(`#${p.id}::-webkit-slider-thumb`) 
                        .appearance('none')
                        .width(`60px`)
                        .height('60px')
                        .border_radius('50%')
                        .background('#4CAF50')
                        .font_size('4vmin')
                        .color('white')
                        .cursor('pointer')
                        
                  .ok();
                return this;
            },
          
        }
        
        oninput = (callback = null,pop = 0)=>{
          if( callback == null ) return;
            let p = this.pars;
            let r = document.getElementById(`${p.id}`);
            if( r ) r.addEventListener('input',callback,pop);
            
        }
        
      
    }
    
    range2       = class{
      
        constructor(){
          
            this.pars = {
              
                into  : 'body',
                id    : 'ajs-range2',
                cl    : 'ajs-range2',
                min1   : 0,
                max1   : 100,
                val1   : 50,
                min2   : 0,
                max2   : 100,
                val2   : 50,
                w     : '96%',
                h     : '16px',
                opc   : 0.7,
                bg    : 'gray',
                bg1   : 'orange',
                bg2   : 'yellow',
                fs1   : '3vmin',
                fs2   : '3vmin',
                r1    : '10px',
                r2    : '10px',
                c1   : 'white',
                c2   : 'black',
                t1   : 'A',
                t2   : 'B',
                callback  : {
                  p1 : {
                    click : null,
                    start : null,
                    move  : null,
                    end   : null,
                  },
                  p2 : {
                    click : null,
                    start : null,
                    move  : null,
                    end   : null,
                  },
                },
                single : 0,
            }
          
        }
        conf  = {
            into  : (anyStr = 'body')=>{ this.pars.into = anyStr; return this.conf; },
            id    : ( val = 'ajs-range2')=>{ this.pars.id = val; return this.conf; },
            cl    : ( val = 'ajs-range2')=>{ this.pars.cl = val; return this.conf; },
            min1   : ( val = 0)=>{ this.pars.min1 = val; return this.conf; },
            max1   : ( val = 100)=>{ this.pars.max1 = val; return this.conf; },
            val1   : ( val = 50)=>{ this.pars.val1 = val; return this.conf; },
            min2   : ( val = 0)=>{ this.pars.min2 = val; return this.conf; },
            max2   : ( val = 100)=>{ this.pars.max2 = val; return this.conf; },
            val2   : ( val = 50)=>{ this.pars.val2 = val; return this.conf; },
            w     : ( val = '96%')=>{ this.pars.w = val; return this.conf; },
            h     : ( val = '70px')=>{ this.pars.h = val; return this.conf; },
            r1     : ( val = '10px')=>{ this.pars.r1 = val; return this.conf; },
            r2     : ( val = '10px')=>{ this.pars.r2 = val; return this.conf; },
            opc   : ( val = 0.7)=>{ this.pars.opc = val; return this.conf; },
            bg   : ( val = 'gray')=>{ this.pars.bg = val; return this.conf; },
            bg1   : ( val = 'orange')=>{ this.pars.bg1 = val; return this.conf; },
            bg2   : ( val = 'yellow')=>{ this.pars.bg2 = val; return this.conf; },
            fs1   : ( val = '3vmin')=>{ this.pars.fs1 = val; return this.conf; },
            fs2   : ( val = '3vmin')=>{ this.pars.fs2 = val; return this.conf; },
            c1   : ( val = 'white')=>{ this.pars.c1 = val; return this.conf; },
            c2   : ( val = 'black')=>{ this.pars.c2 = val; return this.conf; },
            t1   : ( val = 'A')=>{ this.pars.t1 = val; return this.conf; },
            t2   : ( val = 'B')=>{ this.pars.t2 = val; return this.conf; },
            bgc1   : ( val = 'orange white')=>{ 
                let arr = val.split(' ');
                this.pars.bg1 = arr[0];
                this.pars.c1 = arr[1];
                return this.conf; 
            },
            bgc2   : ( val = 'yellow black')=>{ 
                let arr = val.split(' ');
                this.pars.bg2 = arr[0];
                this.pars.c2 = arr[1];
                return this.conf; 
            },
            single   : ( val = 1)=>{ this.pars.single = val; return this.conf; },
            callback : {
              p1 : (a=null,b=null,c=null)=>{
                this.pars.callback.p1.start = a;
                this.pars.callback.p1.move  = b;
                this.pars.callback.p1.end   = c;
                return this.conf;
              },
              p2 : (a=null,b=null,c=null)=>{
                this.pars.callback.p2.start = a;
                this.pars.callback.p2.move  = b;
                this.pars.callback.p2.end   = c;
                return this.conf;
              },
              p1click : (a)=>{
                this.pars.callback.p1.click = a;
                return this.conf;
              },
              p2click : (a)=>{
                this.pars.callback.p2.click = a;
                return this.conf;
              },
            },
            
            done  : ()=>{ return this.done();},
        }
        into  = (anyStr='body')=>{
            //$lg('3319::into',anyStr);
            this.pars.into = anyStr;
            return this.conf;
        }
        done  = ()=>{
            //$lg('3324::done');
            this.css.all();
            this.htm();
            this.event.setup();
            return this;
        }
        htm   = ()=>{
            //$lg('3330::htm');
            let p = this.pars;
            let h = new Html();
            h.dom(p.into)
                .div(`#${p.id}`,`.${p.cl} range2`).top()
                    .div(`.range2-bg`)
                    .div(`.range2-pbox`).as(1)
                        .div(`.range2-point point1`,`!${p.t1}`,1)
                            .data('min1',p.min1)
                            .data('max1',p.max1)
                            .data('val1',p.val1);
                  if(this.pars.single == 1){h.ok();return this;}
                  h.div(`.range2-pbox`).as(2)
                        .div(`.range2-point point2`,`!${p.t2}`,2)
                            .data('min2',p.min2)
                            .data('max2',p.max2)
                            .data('val2',p.val2);
                    
                 h.ok();
            return this;
        }
        css   = {
          
            common : ()=>{
                
                let p = this.pars;
                let cs = new Css();
                cs.style(['cssAjs','cssUi','cssRange2',`css_Range2`])
                    .slt(`.${p.cl}`)
                        .flex.row.p(5)
                        .a.bgd.tsp()
                          .bord.rad('10px')
                          .pad('10px')
                          .mar('10px')
                          .bor('1px solid white')
                          .ds()
                    .slt(`.${p.cl} .range2-bg`) 
                        .f.abs().blk().ds()
                        .a.wh('96%','20px')
                          .padd.top('10px')
                          .bord.rad('10px').ds()
                    .slt(`.${p.cl} .range2-point`) 
                        .f.abs().blk().tac().ds()
                        .a.wh(`66px`,'60px')
                          .bord.rad('50%')
                          .padd.top('10px')
                          .fnt.size('4vmin')
                          .clr('white')
                          .bor('3px solid black')
                          .ds()
                    .slt(`.${p.cl} .range2-pbox`) 
                          .f.abs().ds()
                          .flex.col.cc()
                          .a.wh('60px','98%').tl(0,0)
                            //.bg( cs.rgba.blue(6,0.6) )
                            .bgd.tsp()
                            .ovfl.x.vis()
                            .bor('0px solid green')
                            .ds()
                  .ok();
                return this;
            },
          
            inst : ()=>{
                let p = this.pars;
                let cs = new Css();
                cs.style(['cssAjs','cssUi','cssRange2',`css_${p.id}`])
                    .slt(`#${p.id}`)
                        .a.wh(`${p.w}`,`60px`)
                          .ds()
                    .slt(`#${p.id} .range2-bg`) 
                        .a.wh('96%','20px')
                          .bg(`${p.bg}`)
                          .ds()
                    .slt(`#${p.id} .range2-point`) 
                        .a.wh(`80px`,'60px')
                          .ds()
                    .slt(`#${p.id} .range2-pbox`) 
                          .a.wh('100px','98%').tl(0,0)
                            .ds()
                    .slt(`#${p.id} .point1`) 
                        .f.fs(`${p.fs1}`).ds()
                        .a.bg(`${p.bg1}`)
                          .clr(`${p.c1}`)
                          .l('50px')
                          .bord.rad(`${p.r1}`)
                          .ds()
                    .slt(`#${p.id} .point2`) 
                        .f.fs(`${p.fs2}`).ds()
                        .a.bg(`${p.bg2}`)
                          .clr(`${p.c2}`)
                          .l('150px')
                          .bord.rad(`${p.r2}`)
                          .ds()
                  .ok();
                return this;
            },
            /*range2 : ()=>{
                let p = this.pars;
                let cs = new Css();
                cs.style(['cssAjs','cssUi','cssRange2',`css_${p.id}`])
                    .slt(`#${p.id}`)
                        .flex.row.p(5)
                        .a.wh(`${p.w}`,`60px`)
                          .bgd.tsp()
                          .bord.rad('10px')
                          .pad('10px')
                          .mar('10px')
                          .bor('1px solid white')
                          .ds()
                    .slt(`#${p.id} .range2-bg`) 
                        .f.abs().blk().ds()
                        .a.wh('96%','20px')
                          //.tl('0','0')
                          .padd.top('10px')
                          .bg(`${p.bg}`)
                          .bord.rad('10px').ds()
                    .slt(`#${p.id} .range2-point`) 
                        .f.abs().blk().tac().ds()
                        .a.wh(`66px`,'60px')
                          //.tl(`16px`,`${p.val}%`)
                          .bord.rad('50%')
                          .padd.top('10px')
                          //.bg('#4CAF50')
                          .fnt.size('4vmin')
                          .clr('white')
                          .bor('3px solid black')
                          .ds()
                    .slt(`#${p.id} .range2-pbox`) 
                          .f.abs().ds()
                          .flex.col.cc()
                          .a.wh('60px','98%').tl(0,0)
                            //.bg( cs.rgba.blue(6,0.6) )
                            .bgd.tsp()
                            .ovfl.x.vis()
                            .bor('0px solid green')
                            .ds()
                    .slt(`#${p.id} .point1`) 
                        .a.bg(`${p.bg1}`)
                          .clr(`${p.c1}`)
                          .l('50px')
                          .ds()
                    .slt(`#${p.id} .point2`) 
                        .a.bg(`${p.bg2}`)
                          .clr(`${p.c2}`)
                          .l('150px')
                          .ds()
                    .slt(`.point-sel`) 
                        .a.bor(`6px solid ${cs.rgba.white(9)}`)
                          .bg(cs.rgba.white(6))
                          .clr(cs.rgba.white(9))
                          .ds()
                  .ok();
                return this;
            },*/
            all : ()=>{
              Ajs.runAll(this.css);
              return this;
            },
        }
        event = {
          click : ()=>{
              let clk = (e)=>{
                //$lg('3509::point1 clicked');
                  e.stopPropagation();
                
                let t = e.type;
                    
                    
                //$lg('3584::e.type::bgy',e.type);
                let x = null;
                    x = e.clientX;
                //let y = e.touches[0].clientY;
    
                let ds = e.target;
                    
                let p = 'p2';
                if(ds.className.indexOf('point1')>=0) p = 'p1';
                
                let obj = Reflect.get(this.pars.callback,p);
                let callback = Reflect.get(obj,t);
                    if(callback)callback(ds,t,p,x);
              
                return this;
              }
              let p1 = Doc.api.query(`.range2 .point1`);
              let p2 = Doc.api.query(`.range2 .point2`);
                  p1.addEventListener('click',clk,false);
                  p2.addEventListener('click',clk,false);
              return this;
          },
          touch : {
            
            all : ()=>{
                let p = this.pars;
                let sme = (e)=>{
                  
                    e.stopPropagation();
                    
                    let t = e.type;
                        t = t.replace('touch','');
                        
                    //$lg('3584::e.type::bgy',e.type);
                    let x = null;
                    if(e.type == 'touchmove'){ 
                      x = e.touches[0].pageX;
                      //screenX,clientX,pageX,radiusX
                      
                      /*let ppt = Reflect.getPrototypeOf(e.touches[0]);
                      let keys = Reflect.ownKeys(ppt);
                      if(keys)$lg('3632',...keys);*/
                    }
                    //let y = e.touches[0].clientY;
                    
                    let ds = e.target;
                        ds.style.left = x+`px`;
                        //ds.style.top  = y+`px`;
                    //$lg('3525::className',ds.className);
                    
                    //$lg('3592::event type',t);
                    let p = 'p2';
                    if(ds.className.indexOf('point1')>=0) p = 'p1';
                    
                    let obj = Reflect.get(this.pars.callback,p);
                    let callback = Reflect.get(obj,t);
                        if(callback)callback(ds,t,p,x);
                  
                    return this;
                }
                let p1 = Doc.api.query(`#${p.id} .point1`);
                    p1.addEventListener('touchstart',sme,false);
                    p1.addEventListener('touchmove',sme,false);
                    p1.addEventListener('touchend',sme,false);
                if(this.pars.single == 1) return this;
                let p2 = Doc.api.query(`#${p.id} .point2`);
                    p2.addEventListener('touchstart',sme,false);
                    p2.addEventListener('touchmove',sme,false);
                    p2.addEventListener('touchend',sme,false);
                
            },
            
          },
          updatePos : (pc,num)=>{
            let p = this.pars;
            let point = Doc.api.query(`#${p.id} .point${num}`);
            //$lg('3676::point',point.className);
            let rg2 = point.parentElement.parentElement;
            //$lg('3678::rg2.classList',rg2.classList);
            let width = Doc.api.cspv(rg2,'width');
            //$lg('3680::rg2.width,pc',width,pc);
           
            let wid = parseFloat(width.replace('px',''));
            //let width = rg2.style.width;
            //let width = gp.style.clientWidth;
            point.style.left = wid * pc + 'px';
            
            //$lg('3674::point.style.left',point.style.left);
            
          },
          setup : ()=>{
              this.event.click();
              this.event.touch.all();
          },
        }
        
    }
    
    loading      = class{
      
      constructor(){
        
        this.pars = {
          
          root : 'body',
          
        }
        
      }
      
      square = {
        rot : (anyStr)=>{
          //$lg('4002::loading')
          this.pars.root = anyStr;
          let htm = (anyStr)=>{
            //$lg('4002::anyStr',anyStr);
            let h = new Html();
            h.dom(anyStr)
              .div('.loading loading-square-box').top()
                  .span('.loading-msg')
                  .div('.loading-point')
              .ok();
            return;
          
          };
          let css = ()=>{
            //$lg('4014::loading::css')
            if(Doc.has('.cssAjs .cssUi .cssLoading .cssSquare'))return;
            let cs = new Css();
            cs.style(['cssAjs','cssUi','cssLoading','cssSquare'])
            .slt('.loading-square-box')
                .flex.col.p(5)
                .a.wh('96%','200px')
                  .bgd.tsp()
                  .bor('0px solid red')
                  .ds()
            .slt('.loading-msg')
                .f.rel().fs('5vmin').tac().ds()
                .a.bg(cs.rgba.white(6,0.6))
                  .wh('auto')
                  .bord.rad('10px')
                  .bor('3px solid black')
                  .mar('10px')
                  .marg.top('20px')
                  .marg.bot('30px')
                  .pad('10px')
                  .ds()
            .slt('.loading-point')
                .f.rel().ds()
                .a.wh('60px')
                  //.tl('45%')
                  .bg('orange')
                  .bord.rad('5%')
                  //.mar('10px')
                  .pad('10px')
                  .ani('rot360 2s '+cs.t.infi)
                  //.ani('rot360 2s')
                  .ds()
            .kf('rot360')
                .pc(  0).a
                          //.trsf.ori('50% 50%')
                          .tsf(cs.fn.rot('0deg')).ds()
                
                .pc( 50).a
                          //.trsf.ori('50% 50%')
                          .tsf(cs.fn.rot('180deg')).ds()
                
                .pc(100).a
                          //.trsf.ori('50% 50%')
                          .tsf(cs.fn.rot('360deg')).ds()
                
            .ok();
          };
          css();
          htm(anyStr);
          return this;
        },
        
        remove : ()=>{
          let obj = Doc.api.query('.loading-square-box');
          if(obj)obj.parentElement.removeChild(obj);
          return this;
        },
        
        msg : (text)=>{
          
          let msg = Doc.api.query('.loading-msg');
          if( msg ) msg.innerHTML = text;
          else{
            $lg(`4459::${Log.now()}::bgo`)
          }
          return this;
          
        }
        
      }
      
    
      
    }
    
    msgbox       = class{
          
      constructor(root){
        
        this.data = {
          
          root : root,
          
          id   : null,
          
          clazz : null,
          
          top : '10px',
          
        }
        
        return this;
        
      }
        
      conf = {
        
        clazz : (str)=>{
          
          this.data.clazz = str;
          return this.conf;
          
        },
        
        id : (str)=>{
          
          this.data.clazz = id;
          return this.conf;
          
        },
        
        top : ( val )=>{
          
          this.data.top = val;
          return this.conf;
          
        }
        
      }
        
      index = ()=>{
        
        let css = (()=>{
          if(Doc.api.query('.cssMsgBox'))return this.ui.msgbox;
          let cs = new Css();
          cs.style('cssMsgBox')
          .slt('.msg-box')
              .flex.col.p(8050)
              .f.abs().ds()
              .a.wh('90%','auto')
                .max.h('1450px')
                .top(this.data.top)
                .pad('10px')
                .bor('6px solid black')
                .bord.rad('16px')
                .ovfl.y.scl()
                .bg(cs.rgba.white(3,1))
                .ds()
          .slt('.msg-cont')
              .f.rel().fs('4vmin').ds()
              .a.wh('96%','90%')
                //.max.h('750px')
                .marg.bot('20px')
                .ovfl.y.scl()
                .bg( cs.rgba.white(3,1) )
              .ds()
          .slt('.msg-title')
              .margin_bottom('20px')
              .flex.row.p(46)
              .f.rel().fs('5vmin').ds()
              .a.wh('93%','70px')
                .tr('10px','20px')
                
                //.bg(cs.rgba.white(6,0.9))
              .ds()
          .slt('.msg-tit')
              .f.rel().fs('5vmin').ds()
              .padding_bottom('20px')
          .slt('.msg-btn')
              .f.rel().fs('5vmin').tac().ds()
              .a.wh('70px','99%')
                .bg(cs.rgba.white(10,0.9))
                .clr('black')
                .ds()
          .slt('.hide')
              .a.dsp.no().ds()
          .slt('.show')
              .a.dsp.flx().ds()
          .ok();
          return this;
        })()
      
        let htm = (()=>{
          
          let clz = this.data.clazz == null ? '' : this.data.clazz;
          let id = this.data.id == null ? '' : this.data.id;
          
          let h = new Html();
          h.dom(this.data.root)
            .div(`#${id}`,`.msg-box ${clz} hide`).top()
                .on.click(this.event.center)
                .div('.msg-title').as(1)
                    .div('.msg-tit',1)
                    //.div('.msg-btn msg-btn-hide',`!--`,1).on.click(hide,0)
                    .div('.msg-btn msg-btn-close',`!x`,1)
                .div('.msg-cont')
            .ok()
        
          return this;
        })()
        
      }
      
      event = {
        
        center : (e)=>{
      
          let type = e.type;
          //if(/focus/.test(type))
          //$lg('164::event.type::bgo',type);
          
          let ds  = e.target;
          let dp  = null;
          //let dpp = null;
          if(ds.parentElement) dp = ds.parentElement;
          /*if(dp && typeof dp.parentElement != undefined)
              dpp = dp.parentElement;
          */
          //let parent = (...args)=>{ return dp.classList.contains(...args); }
          let claxx  = (...args)=>{ return ds.className.includes(...args); }
          let clazz  = (...args)=>{ return ds.classList.contains(...args); }
          
          if( type == 'click' ){
            
            if( clazz( 'focus-btn') ){
              //let ds = e.target;
              this.fn.highlight(e);
              
            }else
            
            if( clazz( 'msg-btn-close') ){
              //let ds = e.target;
              this.fn.hide(e);
              
            }
        
          }
      
        },
        
        clickClose : ()=>{
          
          
          
        }
        
      }
      
      fn = {
        
        show : (...args)=>{
          let t = undefined;
          if(args) t = typeof(args[0]);
          if( t == 'object'){
            this.fn.clean();
            let cont = Doc.api.query(this.data.root + ' .msg-cont');
                cont.innerHTML = '';
                cont.appendChild(args[0]);
          }
          let box = Doc.api.query(this.data.root + ' .msg-box');
              box.classList.remove('hide');
              box.classList.add('show');
              box.style.zIndex = 100;
          return this;
        },
        
        title : (str)=>{
          
          let obj = Doc.api.query(this.data.root + ' .msg-tit');
          if( obj ){
            
            obj.innerHTML = str;
            
          }
          
        },
        
        hide : ()=>{
          let box = Doc.api.query(this.data.root + ' .msg-box');
              box.classList.remove('show');
              box.classList.add('hide');
              box.style.zIndex = 0;
              box.style.top = 'auto';
              box.style.height = 'auto';
              box.style.width = '90%';
              
          return this;
        },
        
        clean : ()=>{
          let box = Doc.api.query('.msg-cont');
              box.innerHTML = '';
              
          return this;
        },
        
        highlight : (e)=>{
          
          let ds = e.target;
          
          [...ds.parent.children].forEach((elm)=>{
            elm.classList.remove('yelack');
          })
          
          if( ds.classList.contains('yelack') ) 
              ds.classList.remove(yelack);
          else 
              ds.classList.add('yelack');
          
        },
        
      }
          
    }
    
    tree         = class{
      
      constructor(){
        
        this.data = {
        
          root : null,
          
          event : {},
          
          arr : [],
          
          css :{
            
            maxHeight : '800px',
            
          },
          
          source : [],
          
        }
        
      }
      
      
      conf = {
        
        root : (queryStr)=>{
          
          this.data.root = queryStr;
          return this.conf;
          
        },
        
        arr  : (arr)=>{
          
          for(let item of arr){
            this.data.arr.push(item)
          }
          
          return this.conf;
          
        },
        
        maxHeight : (str)=>{
          
          this.data.css.maxHeight = str;
          return this.conf;
          
        },
        
        onExpand : (callback)=>{
          this.data.event.onExpand = callback;
          return this.conf;
          
        },
        
        onFold : (callback)=>{
          this.data.event.onFold = callback;
          return this.conf;
          
        },
        
        onClickText : (callback)=>{
          this.data.event.onClickText = callback;
          return this.conf;
          
        },
        
        onMoveOk : (callback)=>{
          this.data.event.onMoveOk = callback;
          return this.conf;
          
        },
        
        onMoveUp : (callback)=>{
          this.data.event.onMoveUp = callback;
          return this.conf;
          
        },
        
        onMoveDown : (callback)=>{
          this.data.event.onMoveDown = callback;
          return this.conf;
          
        },
        
        onEdit : (callback)=>{
          this.data.event.onEdit = callback;
          return this.conf;
          
        },
        
        onDelete : (callback)=>{
          this.data.event.onDelete = callback;
          return this.conf;
          
        },
        
        onHide : (callback)=>{
          this.data.event.onHide = callback;
          return this.conf;
        },
        
        clazz : (str)=>{
          
          this.data.clazz = str;
          return this.conf;
          
        },
        
        id : (str)=>{
          
          this.data.id = id;
          return this.conf;
          
        },
        
        //
        color : (str)=>{
          this.data.color = str;
          return this.conf;
        }
        
      }
      
      index = ()=>{
        
        let css = (()=>{
          
          if(Doc.has(`style[class*='folderTree']`)) return;
          
          let cs = new Css();
          
          Css.root = 'Ajs/ui/folderTree';
          
          let color = cs.rgba.white(9,1);
          
          new Css('.folder-tree',{
            position        : 'relative',
            height          : '96%',
            max_height      : `${this.data.css.maxHeight} !`,
            width           : '96%',
            margin          : '6px',
            padding         : '10px',
            padding_left    : '30px',
            padding_top     : '20px',
            border          : '2px solid black',
            overflow        : 'scroll !',
          })//.folder-tree 
          new Css('.folder-tree-item',{
            display         : 'flex',
            flex_direction  : 'column',
            justify_content : 'flex-start',
            align_items     : 'flex-start',
            position        : 'relative',
            height          : 'auto',
            //min_height      : '70px',
            left            : '30px',
            width           : '96%',
            margin          : '2px',
            //margin_left     : '40px',
            padding         : '6px',
            font_size       : '4vmin',
            //background      : 'transparent',
            border          : '0px solid blue',
            //overflow        : 'visible',
          })//.folder-tree-item
          new Css('.folder-tree-row4',{
            display         : 'flex',
            flex_direction  : 'row !',
            justify_content : 'flex-start',
            align_items     : 'flex-start',
          })//.folder-tree-row
          
          
          new Css('.folder-tree-line',{
            position        : 'relative',
            /*
            display         : 'flex',
            flex_direction  : 'row',
            justify_content : 'flex-start',
            align_items     : 'flex-start',
            */
            width           : 'auto',
            min_height      : '70px',
            height          : '70px',
            padding         : '6px',
            border          : '2px solid black',
            border_radius   : '10px',
          })//.folder-tree-line
          /*
          new Css('.folder-tree-cline',{
            position        : 'relative',
            display         : 'flex',
            flex_direction  : 'column',
            justify_content : 'center',
            align_items     : 'flex-start',
            width           : '70px',
            min_height      : '160px',
            border          : '0px solid gray',
            //min_height      : '70px',
          })//.folder-tree-cline
          */
          new Css('.folder-tree-menu',{
            
            position        : 'relative',
            //top             : '-6px',
            //left            : '50px',
            margin_left     : '3px',
            padding         : '1px',
            font_size       : '3vmin',
            background      : cs.rgba.white(9,1),
            width           : '42px',
            height          : '90%',
            
            border          : `1px solid ${cs.rgba.white(10,1)}`,
            //border_right    : `16px solid ${color}`,
            border_top_left_radius     : '6px',
            border_bottom_left_radius  : '6px',
            
            z_index         : 3,      
            
          })//.folder-tree-menu
          new Css('.folder-tree-text',{
            position        : 'relative',
            width           : 'auto',
            //min_width       : '100px',
            //margin          : '2px',
            margin_left     : '0px',
            margin_right    : '6px !',
            padding_left    : '10px !',
            padding_right   : '10px !',
            padding         : '2px',
            //padding_left    : '56px',
            //padding_right   : '16px',
            height          : '80%',
            vertical_align  : 'middle',
            //background      : 'lightyellow',
            white_space     : 'nowrap',
            border_radius   : '0px',
            border          : `1px solid ${cs.rgba.white(10,1)}`,
            background      :  cs.rgba.white(8,1),
            border_top_right_radius     : '6px',
            border_bottom_right_radius  : '6px',
            z_index         : 2,
          })//.folder-tree-text
          new Css('.folder-tree-box',{
            position        : 'relative',
            //display         : 'flex',
            //flex_direction  : 'column',
            //justify_content : 'flex-start !',
            //align_items     : 'flex-start !',
            padding         : '6px',
            //padding_top     : '50px',
            margin          : '6px',
            margin_left     : '30px',
            width           : 'auto',
            height          : 'auto',
            min_width       : '200px',
            min_height      : '30px',
            height          : 'auto',
            border          : '0px solid white',
            //border_radius   : '16px',
            //background      : cs.rgba.white(3,0.6),
            background        : 'transparent',
            z_index         : 3,
          })//.folder-tree-box
          
          
          new Css('.folder-dir-tool',{
            position        : 'relative',
            //top             : '-6px',
            //left            : '50px',
            margin          : '2px',
            padding         : '2px',
            font_size       : '36px',
            background      : 'lightyellow',
            //left            : '42px',
            width           : '42px',
            height          : '45px',
            
            border          : `0px solid lightyellow`,
            border_radius   : `10px`,
            //border_right    : `16px solid ${color}`,
            //border_top_left_radius     : '6px',
            //border_bottom_left_radius  : '6px',
            z_index         : 3,      
            
          })//.folder-dir-tool
          new Css('.folder-tree-submenu',{
            position          : 'absolute',
            top               : '-10px',
            left              : '200px',
            font_size         : '5vmin',
            width             : 'auto',
            max_width         : '560px',
            //height            : '96%',
            margin            : '2px',
            //margin_left       : '4px',
            //margin_right      : '4px',
            padding           : '2px',
            //padding_left      : '10px',
            //padding_right     : '10px',
            border_radius     : '10px',
            //border            : '3px solid gray',
            //flex_grow         : 1,
            text_align        : 'center',
            background        : cs.rgba.white(10,0.6),
            z_index           : 6,
            overflow          : 'scroll',
          })//.folder-tree-submenu
          new Css('.folder-tree-tool',{
            position          : 'relative',
            
            font_size         : '30px',
            //width             : 'auto',
            min_width         : '100px',
            height            : '70px',
            margin            : '5px',
            padding           : '5px',
            border_radius     : '10px',
            border            : '0px solid black',
            flex_grow         : 1,
            text_align        : 'center',
            white_space       : 'nowrap',
            //overflow          : 'hidden',
            //text_overflow     : 'ellipsis',
            flex_badis        : 'auto',
            
          })//.folder-tree-tool
          new Css('.folder-reset-order',{
            
            width             : '160px !',
            
            
          })//.folder-reset-order
          new Css('.folder-hide-title',{
            
            width             : '160px !',
            
            
          })//.folder-hide-title
          
          new Css('.folder-tree-pink',{
            background      : 'pink !',
            color           : 'white !',
            
          })//.folder-tree-pink
          
          new Css('.folder-tree-source',{
            background      : cs.rgba.white(12,1),
            color           : 'white',
            opacity         : 1,
            padding         : '10px !',
            font_size       : '26px !',
          })//.folder-tree-source
          new Css('.folder-tree-target',{
            background      : cs.rgba.white(12,1),
            color           : 'white',
            opacity         : 1,
            padding         : '10px !',
            font_size       : '26px !',
          })//.folder-tree-target
          new Css('.folder-tree-arrow',{
            background      : 'transparent',
            color           : 'orange',
            opacity         : 1,
            padding         : '10px !',
            width           : '30px !',
            min_width       : '30px !',
            font_size       : '26px !',
            border          : '2px dolid black !',
            border_radius   : '10px !',
          })//.folder-tree-arrow
          new Css('.folder-tree-empty',{
            //background      : cs.rgba.white(3,0.3),
            background      : cs.rgba.white(10,0.6),
            color           : 'transparent !',
            //opacity         : 1,
            padding         : '6px !',
            width           : '40px !',
            height          : '40px !',
            //font_size       : '36px !',
            left            : '30px',
            border          : `0px solid ${cs.rgba.white(3,0.3)} !`,
            border_radius   : '50% !',
            z_index         : 2,
          })//.folder-tree-empty
          
          new Css('.folder-tree-border',{
            border          : '3px solid white !',
            border_radius   : '10px !',
            min_width       : '100px !',
            min_height      : '100px !',
          })//.folder-tree-border
          new Css('.folder-tree-hide',{
            display         : 'none !',
          })//.folder-tree-hide
          new Css('.folder-tree-abs',{
            display         : 'flex !',
            position        : 'absolute !',
            top             : '16px !',
            left            : '10px !',
            z_index         : '3 !',
          })//.folder-tree-abs
          new Css('.tri-top-left', {
              width         : '0px !',
              height        : '0px !',
              left          : '50px !',
              border_top    : '40px solid red !',
              border_right  : '40px solid transparent !',
              border_top_left_radius     : '0px !',
              border_bottom_left_radius  : '0px !',
          })//.tri-top-left
          new Css('.folder-dot-menu', {
              position      : 'relative',
              width         : '50px !',
              height        : '50px !',
              
              left          : '50px !',
              border_radius : '50%',
              border        : '0px solid black',
              background    : cs.rgba.white(9,1),
          })//.folder-dot-menu
          
          Css.root = 'Ajs';
          
        })()
        
        let htm = (()=>{
          
          let id    = this.data.id    == null ? '' : this.data.id;
          let clazz = this.data.clazz == null ? '' : this.data.clazz;
          
          let html = new Html();
          html.dom(this.data.root)
              .div(`#${id}`,`.folder-tree ${clazz} flex-col-7`)
                  .on.click(this.event.center,0)
              .ok();
          
        })()
        
        if(this.event.onIndex)
           this.event.onIndex();
           
      }
      
      event = {
        
        center : (e)=>{
          let ds = e.target;
          let dp = ds.parentNode;
          let clazz = (name)=>{ return ds.classList.contains(name); }
          
          //alert(e.tyoe)
          
          if( e.type == 'click'){
            
            //$lg('ajs:4787:className::bgy',ds.className);
            
            
            
            if( clazz( 'folder-tree-menu' )){
              this.event.clickItemMenu(e,ds)
            }else
            if( clazz( 'folder-tree-box' )){
              this.event.clickItemMenu(e,ds)
            }else
            if( clazz( 'folder-dot-menu' )){
              this.event.clickItemMenu(e,ds)
            }else
            
            if( clazz( 'folder-tree-text' )){
              this.event.clickItemText(e,ds)
            }else
            if( clazz( 'folder-tree-box' )){
              this.event.clickItemText(e,ds)
            }else
            
            if( clazz( 'folder-tree-close' )){
              this.subMenu.event.clickClose(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-edit' )){
              this.subMenu.event.clickEdit(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-move' )){
              this.subMenu.event.clickMove(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-move2' )){
              this.subMenu.event.clickMove2(e,ds,dp)
            }else
            
            if( clazz( 'folder-multi-target' )){
              this.subMenu.event.clickMultiTarget(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-top' )){
              this.subMenu.event.clickTop(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-row' )){
              this.subMenu.event.clickRow(e,ds,dp)
            }else
           
            if( clazz( 'folder-tree-col' )){
              this.subMenu.event.clickCol(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-up' )){
              this.subMenu.event.clickUp(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-down' )){
              this.subMenu.event.clickDw(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-delete' )){
              this.subMenu.event.clickDelete(e,ds,dp)
            }else
            
            if( clazz( 'folder-reset-order' )){
              this.subMenu.event.clickResetOrder(e,ds,dp)
            }else
            
            if( clazz( 'click-hide-title' )){
              this.subMenu.event.clickHideTitle(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-ok' )){
              this.subMenu.move.event.clickOk(e,ds,dp)
            }
            
            this.fn.highlight(ds);
            
          }
          
        },
        
        clickItemMenu : (e,ds)=>{
          //let ds = e.target;
          let dp = ds.parentElement;
          let id = dp.getAttribute('data-tree-id');
          //$lg('ajs:4828::clickMenu:id',id);
          this.subMenu.index(id)
          
        },
        
        clickItemText : async (e,ds)=>{
          
          try{
            //$lg('5064::bgy',ds.className);
            //let ds = e.target;
            let item = ds.parentElement;
            
            let id = item.getAttribute('data-tree-id');
            id = parseInt(id);
            //$lg('5071::bgb',id);
            
            item = Doc.api.query(`.folder-tree-item[data-tree-id='${id}']`);
            //$lg('5072::bgg',item.className);
            
            if(this.data.event.onClickText){ 
              this.data.event.onClickText()
            }
               
            this.item.setTarget(id);
            
            let st = item.getAttribute('data-tree-status');
            //$lg('5083::bgo',st == null,st);
            if( st == null || st == '0'){
              //download item
              // 展开
              //$lg('5089::bgg','展开');
              item.setAttribute('data-tree-status','1');
              this.item.updateChildren(id);
              if( this.data.event.onExpand ){
                let datItem = this.dataObj.getItem(id);
                let maxId = this.dataObj.getMaxId();
                this.data.event.onExpand(id,maxId,datItem);
              }
              //this.item.emptyPopMenu(id);
            }else{
              //$lg('5097::bgy','折叠');
              // 折叠，删除所有子项目
              item.setAttribute('data-tree-status','0');
              this.item.removeChildren(id);
              if( this.data.event.onFold ){
                this.data.event.onFold();
              }
            }
          }catch(e){
              $lg('5102::bgo',e.message)
            }
        
        },
      
      }
      
      subMenu = {
        
        index : (id = 0)=>{
          
          //$lg('ajs:4893:subMenu.index')
          
          //let ds = e.target;
          //let dpp = e.target.parentElement.parentElement;
          //let has = (...args)=> ds.classList.contains(...args);
          
          let dpp = `.folder-tree-item[data-tree-id='${id}']`;
          
          this.subMenu.fn.clearSubMenu();
          let h = new Html();
          h.dom( dpp )
              .div('.folder-tree-submenu flex-row-4').top()
                .at.data('data-tree-id',id)
                .button('.folder-tree-tool folder-tree-close','!\u00ab')
                .button('.folder-tree-tool folder-tree-up','!\u21d1')
                .button('.folder-tree-tool folder-tree-down','!\u21d3')
                .button('.folder-tree-tool folder-tree-move','!\u21d5')
                .button('.folder-tree-tool folder-tree-move2','!\u21f6')
                .button('.folder-tree-tool folder-tree-top','!\u21f1')
                .button('.folder-tree-tool folder-tree-row','!\u22ef')
                .button('.folder-tree-tool folder-tree-col','!\u22ee')
                .button('.folder-tree-tool folder-reset-order','!重排序号')
                .button('.folder-tree-tool folder-hide-title','!隐藏标题')
                .button('.folder-tree-tool folder-tree-edit','!\u270e')
                .button('.folder-tree-tool folder-tree-delete','!\u2297')
          
          h.ok();
        
        },
        
        event : {
          
          clickClose : (e,ds,dp)=>{
            
            this.subMenu.fn.clearSubMenu();
            
            this.item.clearPinkTree();
            
          },
          
          clickMove : (e,ds,dp)=>{
            
            this.subMenu.move.index();
            
            let obj = Doc.api.query(`${this.data.root} .yelack`);
            let id = obj.parentElement.parentElement.getAttribute('data-tree-id');
            
            this.data.source = parseInt(id);
            
            let str = `${this.data.root} .folder-tree-submenu`;
            let smenu = Doc.api.query(str);
            if( smenu ) smenu.classList.add('folder-set-target');
            
          },
          
          clickMove2 : (e,ds,dp)=>{
            
            this.subMenu.move2.index();
            
            let obj = Doc.api.query(`${this.data.root} .yelack`);
            let id = obj.parentElement.parentElement.getAttribute('data-tree-id');
            
            this.data.source = parseInt(id);
            
            let str = `${this.data.root} .folder-tree-submenu`;
            let smenu = Doc.api.query(str);
            //if( smenu ) smenu.classList.add('folder-set-target');
            
          },
          
          clickUp : (e,ds,dp)=>{
            
            let id = dp.getAttribute('data-tree-id');
                id = parseInt(id);
                
            let dataDs = this.fn.getDataOf(id);
            let od = dataDs.od - 1;
            
            if( od < 0 ) return;
            
            let tod = dataDs.od;
            let tid = this.item.getIdByOd(dataDs.od - 1);

            this.item.setOrderById(tid, tod);
            
            this.item.setOrderById(id, od);
            
            if(this.data.event.onMoveUp)
               this.data.event.onMoveUp();

          },
          
          clickDw : (e,ds,dp)=>{
            
            
            let id = dp.getAttribute('data-tree-id');
                id = parseInt(id);
            
            // 检查是否已经在最底
            let max = 0;
            for(let item of this.data.arr){
              if( max < item.od ) max = item.od;
            }
            
            let dataDs = this.fn.getDataOf(id);
            let od = dataDs.od+1;
            
            let tid = this.item.getIdByOd(dataDs.od+1);
            let tod = dataDs.od;
            
            if( dataDs.od >= max ) return;
          
            this.item.setOrderById(tid, tod);
            
            this.item.setOrderById(id, od);
            
            if(this.data.event.onMoveDown)
               this.data.event.onMoveDown();
            
          },
          
          clickTop : (e,ds,dp)=>{
              this.subMenu.fn.clearToolAll();
              
              let id = dp.getAttribute('data-tree-id');
              let upid = 0;
              /*
              let rsp = await this.service.data.req('tableCata.update.upid',id,upid);
              if( rsp.da.rst == false ) return alert( rsp.da.msg );
              Doc.api.query('.cata-submenu .close').click();
              Doc.api.query('.panel-cata .panel-menu .list').click();
              */
          },
          
          clickRow : (e,ds,dp)=>{
              
              let obj = Doc.api.query(`${this.data.root} .yelack`);
              let id = obj.parentElement.parentElement.getAttribute('data-tree-id');
            
              let box = this.item.select(id,'box');
              
              box.style.flexDirection = 'row';
              
          },
          
          clickCol : (e,ds,dp)=>{
              
              //let obj = Doc.api.query(`${this.data.root} .yelack`);
              let id = ds.parentElement.getAttribute('data-tree-id');
            
              let box = this.item.select(id,'box');
              
              box.style.flexDirection = 'column';
              
          },
          
          clickEdit : (e,ds,dp)=>{
              let id = dp.getAttribute('data-tree-id');
              $lg('3558::id',id);
              this.subMenu.fn.clearToolAll();
              let fgm = this.subMenu.edit.index(id);
              this.fn.show( fgm );
              
          },
          
          clickDelete : (e,ds,dp)=>{
            
              let id = dp.getAttribute('data-tree-id');
              
              this.subMenu.fn.clearToolAll();
              let fgm = this.subMenu.del.index(id);
              dp.parentNode.appendChild( fgm );
              
          },
          
          clickResetOrder : (e,ds,dp)=>{
            
            //alert('clickResetOrder');
            
            $lg('5334::clickResetOrder::bgb');
            
            let obj = Doc.api.query(`${this.data.root} .yelack`);
            let id = obj.parentElement.parentElement.getAttribute('data-tree-id');
            $lg('id:',id);
            
            let i = -1;
            for( let item of this.data.arr){
              
              if( item.up == id ){
                i++;
                item.od = i;
              }
              
            }
            
            this.item.updateChildren(id);
              
            this.subMenu.fn.clearSubMenu();
              
          },
          
          clickHideTitleAll : (e,ds,dp)=>{
            
            
              
          },
          
        },
        
        move : {
            
            index : ()=>{
              this.subMenu.fn.clearToolAll();
              let htm = new Html()
              .dom('.folder-tree-submenu')
                  .at.data('data-msg','single')
                  .button('.folder-tree-tool folder-tree-close',`!\u00ab`)
                  //.button('.folder-tree-tool folder-tree-source',`!点击item`)
                  //.button('.folder-tree-tool folder-tree-arrow',`!=>`)
                  .button('.folder-tree-tool folder-tree-target',`!点击目的地`)
                  .button('.folder-tree-tool folder-tree-ok',`!ok`)
              .ok();
              /*
              let source = [
                this.data.root,
                //'folder-tree-item',
                'yelack'
              ].join(' .');
              
              $lg('target::bgb',source);
              
              let target = Doc.api.query(source);
              $lg('target::bgb',target);
              
              if( !target ) return;
              let item = target.parentElement;
              if( !item ) return;
              
              let text = item.querySelector('.folder-tree-text');
              if( !text ) return;
              
              text.classList.add('folder-to-move'); 
              */
              this.item.pinkTarget();
              
            },
            
            event : {
              
              clickOk : (e,ds,dp)=>{
                
                let src = this.data.source;
                let tar = this.data.target;
                
                //alert(`src:${src}\ntar:${tar}`);
                if( src == null || tar == null ) return;
                if( src ==  tar  ) return alert('源和目标不能是同一单词');
                
                for( let item of this.data.arr){
                  
                  if( item.id == src ){
                    
                    item.up = tar
                    
                  }
                  
                }
                
                if(this.data.event.onMoveOk)
                   this.data.event.onMoveOk(it.id,tar);
                
                this.subMenu.fn.clearSubMenu();
                
                this.item.remove(src);
                
                this.item.clearPinkTree();
                
                this.data.source = null;
                this.data.target = null;
                
              }
              
            }
            
            
          },
          
        move2 : {
            
            index : ()=>{
              this.subMenu.fn.clearToolAll();
              let htm = new Html()
              .dom('.folder-tree-submenu')
                  .at.data('data-msg','multi')
                  .button('.folder-tree-tool folder-tree-close',`!\u00ab`)
                  //.button('.folder-tree-tool folder-tree-source',`!点击item`)
                  //.button('.folder-tree-tool folder-tree-arrow',`!=>`)
                  .button('.folder-tree-tool folder-tree-target folder-multi-target',`!开始多选`)
                  .button('.folder-tree-tool folder-tree-ok',`!ok`)
              .ok();
              /*
              let source = [
                this.data.root,
                //'folder-tree-item',
                'yelack'
              ].join(' .');
              
              $lg('target::bgb',source);
              
              let target = Doc.api.query(source);
              $lg('target::bgb',target);
              
              if( !target ) return;
              let item = target.parentElement;
              if( !item ) return;
              
              let text = item.querySelector('.folder-tree-text');
              if( !text ) return;
              
              text.classList.add('folder-to-move'); 
              */
              this.item.pinkTarget();
              
            },
            
            event : {
              
              clickMultiTarget : (e,ds,dp)=>{
                
                let smenu = Doc.api.query('.folder-tree-submenu');
                if( !smenu ) return;
                
                smenu.setAttribute('data-msg','finish');
                
                ds.innerText = '选择目的地';
                
                
              },
              
              clickOk : (e,ds,dp)=>{
                
                let src = this.data.source;
                let tar = this.data.target;
                
                //alert(`src:${src}\ntar:${tar}`);
                if( src == null || tar == null ) return;
                if( src ==  tar  ) return alert('源和目标不能是同一单词');
                
                for( let item of this.data.arr){
                  
                  if( item.id == src ){
                    
                    item.up = tar
                    
                  }
                  
                }
                
                if(this.data.event.onMoveOk)
                   this.data.event.onMoveOk(it.id,tar);
                
                this.subMenu.fn.clearSubMenu();
                
                this.item.remove(src);
                
                this.item.clearPinkTree();
                
                this.data.source = null;
                this.data.target = null;
                
              }
              
            }
            
            
          },
        
        del  : {
          index : (id)=>{
          
            let htm = new Html()
            .dom()
                .div('.cata-submenu submenu-del flex-row-5').top()
                  .data('id',id)
                  .span('.btn cata-del-alert',`!del ?`)
  
                  .button('.btn cata-del-yes',`!yes`)
                  .button('.btn cata-del-no',`!no`)
              
            .queryAll('.btn').on.click((e)=>{return;},1)
            
            .query('.submenu-del').on.click( async(e)=>{
              let ds = e.target;
              this.ui.fn.highlight(e);
              let has = (a)=>{ return ds.classList.contains(a)};
              /*if( has('cata-move-close') ){
                ds.parentNode.parentNode.removeChild(ds.parentNode);
              }else*/
              if( has('cata-del-yes') ){
                //$lg('3556::dp.className',ds.parentNode.className,ds.parentNode.parentNode.className);
                let dp = ds.parentNode;
                let id = dp.getAttribute('data-ajs-id');
                
                let rsp = await this.service.data.req('tableCata.del',id);
                if( rsp.da.rst == false ) return alert( rsp.da.msg );
                Doc.api.query('.cata-submenu .close').click();
                Doc.api.query('.panel-cata .panel-menu .list').click();
              }else 
              if( has('cata-del-no') ){
                //$lg('3556::dp.className',ds.parentNode.className,ds.parentNode.parentNode.className);
                
                Doc.api.query('.cata-submenu .close').click();
                
              }
            },0);
            
            return htm.pack();
          }
        },
        
        edit : {
          index : (caid)=>{
            
            let htm = new Html().dom()
            .div('.pan cata-edit-box flex-col-5').top()
              .data('temp',caid)
              .input.text('.btn cata-edit-input')
              .button('.btn cata-edit-ok',`!ok`)
                .on.click(async (e)=>{
                  
                  let ds = e.target;
                  let dp = e.target.parentNode;
                  
                  let name = dp.firstChild.value.trim();
                  
                  let id = dp.getAttribute('data-ajs-temp');
                  
                  if( name == null || name.length == 0 ) return;
                  
                  let rsp = await this.service.data.req('tableCata.update.name',id,name);
                  
                  if( rsp.da.rst == false ){ return  alert( rsp.da.msg ) };
                  
                  this.fn.hide();
                  Doc.api.query('.panel-cata .panel-menu .list').click();
                  
                },0);
            
            return htm.pack();
            
          },
        },
        
        fn : {

          clearToolAll : ()=>{
              [...Doc.api.queryAll('.folder-tree-tool')].forEach(obj=>{
                obj.parentNode.removeChild(obj);
              })
          },
          
          clearSubMenu : ()=>{
              [...Doc.api.queryAll('.folder-tree-submenu')].forEach(obj=>{
                obj.parentNode.removeChild(obj);
              })
          },
          
          
        
        },
        
      }
      
      item = {
        ////////////////////////////////////////////////
        // arr 参数格式要求
        ////////////////////////////////////////////////
        //   id : number，整型，本体代号
        //   up : number，整型，表示上家
        //   od : number，整型, 表示顺序排列(order)
        // text : string，字符串, 表示显示文本内容
        // [
        //    { id:0, up:0, order:1,  text:'word'}, 
        //    ..
        // ]
        ////////////////////////////////////////////////
        add : ( arr,top = null )=>{
          try{
            $lg('3554::add::items::arr',JSON.stringify(arr));
            
            if( arr.length == 0 ) return;
            
            let htm = new Html();
          
            let check = (id)=>{
              for( let a of this.data.arr ){
                  if(a.id == id) return 1
              }
              return 0
            }
            
            for( let item of arr ){
              
              let   id = item.id;
              let   up = item.up;
              let   od = item.od;
              let text = item.text;
              let type = item.type; //0:普通 1:box
              let dir  = item.dir;  // 排列方向，1:横，0:竖
              let flex = item.flex; // flex-col-46
              let fold = item.fold; // 折叠
              let tid   = item.tid == null ? '' :`#${item.tid}` ; // text-id
              let clazz = item.clazz == null ? '' : ` ${item.clazz}` ; // text-class
              
              /*
              if(check(id) == 0){
                this.data.arr.push(item);
              };*/
              $lg('arr::bgb',id,up,od,text);
              
              top = this.data.root + ' .folder-tree';
              
              
              if( up >= 0 ){
                
                top = [
                  this.data.root,
                  //'.folder-tree',
                  //`.folder-tree-item`,
                  `.folder-tree-box[data-tree-id='${up}']`,
                ].join(' ');
              }
              
              let tobj = Doc.api.query(top);
              if( !tobj ){ 
                $lg('6006::bgo',id,top,tobj)
                //return;
              }else{
                tobj.innerHTML = '';
              }
              dir  = dir == 0 ? 'col' : 'row';
              flex = `flex-${dir}-${flex}`;
              
              fold = fold == 0 ? 'expand' : 'fold';
              fold = `folder-tree-${fold}`;
              let obj = Doc.api.query(top);
              //$lg('5504::bgb',obj);
              
              
              
              htm.dom( top );
              if(type == 0){
                htm.div(`.folder-tree-item flex-col-7`).top()
                  .at.data('data-tree-id',id)
                  .at.style(`order:${od}`)
                  .div(`.folder-tree-line flex-row-4`).as(1)
                      .at.data('data-tree-id',id)
                      .button(1,tid,`.folder-tree-menu`)
                      .span(1,`${tid}`,`.folder-tree-text${clazz}`,`!${text}`)
                          //.at.data('data-tree-id',id)
                  .div(`.folder-tree-box ${flex} ${fold}`).as(1)
                      .at.data('data-tree-id',id)
              }else
              if(type == 1){
                htm.div(`.folder-tree-item flex-col-7`).top()
                  .at.data('data-tree-id',id)
                  .at.style(`order:${od}`)
                  .div(`.folder-tree-line flex-row-4`).as(1)
                      .at.data('data-tree-id',id)
                      .button(1,`.folder-dot-menu`)
                      .span(1,`${tid}`,`.folder-tree-text folder-tree-empty${clazz}`,`!${text}`)
                  .div(`.folder-tree-box ${flex} ${fold}`).as(1)
                      .at.data('data-tree-id',id)
              }

            }
            
            htm.ok();
          }catch(e){
              $lg('5535::bgo',e.message)
          }
        },
        
        select : (id,which='item')=>{
          
          if(!['item','menu','text','box'].includes(which)) return null;
          
          let arr = [
            this.data.root,
            'folder-tree',
            `folder-tree-${which}[data-tree-id='${id}']`
          ]
            
          return Doc.api.query( arr.join(' .'));

        },
        
        getByOrder : (od,which='item')=>{
          
          if(!['item','menu','text'].includes(which)) return null;
          
          let id = null;
          
          for(let item of this.data.arr){
            
            if( item.od == od ) id = item.id
            
          }
          
          if( id == null ) return null;
          
          let arr = [
            this.data.root,
            'folder-tree',
            `folder-tree-${which}[data-tree-id='${id}']`
          ]
            
          return Doc.api.query( arr.join(' .'));

        },
        
        getIdByOd : (od)=>{
          
          
          let id = null;
          
          for(let item of this.data.arr){
            
            if( item.od == od ) id = item.id
            
          }
          
          return id;
      
        },
         
        remove : (id)=>{
          
          let obj = this.item.select(id);
          
          if( obj ) obj.parentElement.removeChild(obj);

        },
        
        clearAll : ()=>{
          let arr = [
            this.data.root,
            'folder-tree',
            'folder-tree-item'
          ]
            
          let objs = Doc.api.queryAll( arr.join(' .'));
          
          if( !objs ) return;
          
          for( obj of objs){
            
            obj.parentElement.removeChild(obj);
            
          }
          
        },
        
        setOrderById : (id,order)=>{
          
          for(let item of this.data.arr){
            if(item.id === id){
              item.od = order
            }
          }

          let obj = this.item.select(id);
          
          if( obj ) obj.style.order = order;
          
        },
        
        setOrderByOd : (od,order)=>{
          
          let id = null;
          
          for(let item of this.data.arr){
            if(item.od === order){
              id = item.id
            }
          }
          if( id == null )  return;
          
          let obj = this.item.select(id);
          
          if( obj ) obj.style.order = order;
          
        },
        
        setOrderUp : (id)=>{
          
          let obj = this.item.select(id);
          
          let od = 0;
          for(let item of this.data.arr){
            if(item.id === id){
              od = item.order-1 == 0 ? item.order-1 : 0;
              item.od = od;
            }
          }
          if( obj ) obj.style.order = od;

        },
        
        setOrderDw : (id)=>{
          
          let obj = this.item.select(id);
          $lg('5218::bgo',obj);
          let od = 0;
          for(let item of this.data.arr){
            if(item.id == id){
              od = item.od+1;
              item.od = od;
            }
          }
          if( obj ) obj.style.order = od;

        },
        
        setText : (id,txt)=>{
          
          let obj = this.item.select(id,'text');
          
          if( obj ) obj.innerText = txt;
          
          for(let item of this.data.arr){
            if(item.id === id){
              item.text = txt
            }
          }

        },
        
        getText : (id)=>{
          
          let obj = this.item.select(id,'text');
          
          if( obj ) return obj.innerText;
          
          return null;

        },
        
        setUpObj : (id,up)=>{
          
          let obj = this.item.select(id);
          
          if( obj ) obj.innerText = txt;
          
          for(let item of this.data.arr){
            if(item.id === id){
              item.up = up
            }
          }
          
          

        },
        
        updateChildren : (id)=>{
          
          //$lg('5707','updateChildren');
          
          this.item.removeChildren(id);
          
          let arr = [];
          for(let item of this.data.arr){
            if(item.up === id){
              arr.push(item);
            }
          }
          
          this.item.add(arr);

        },
        
        removeChildren : (id)=>{
          
          let box = this.item.select(id,'box');
          
          if( box ) box.innerHTML = '';
          
          //if( obj ) obj.innerHTML = '';
          /*
          let child = item.children;
          if( child.length > 0 ){
            for(let chd of [...child]){
              if(chd.classList.contains('folder-tree-item'))
                { chd.parentElement.removeChild(chd); }
            }
          }
          */
          
        },
        
        setOd : (id,od)=>{
          
        },
        
        setTarget : (id)=>{
          
          let smenu = Doc.api.query(`${this.data.root} .folder-tree-submenu`);
          if( !smenu ) return;
          
          let msg = smenu.getAttribute('data-msg');
          
          if( smenu.classList.contains(`folder-set-source`)){
            this.data.source.push(id);
            if( msg == 'single' || msg == 'finish' ){
              smenu.classList.remove(`folder-set-source`);
              smenu.classList.add(`folder-set-target`);
            }else
            if( msg == 'multi'){
              let multi = Doc.api.query(`${this.data.root} .folder-multi-target`);
              if( !multi ) return;
              multi.innerText = '点此结束多选';
            }
          }else
          if( smenu.classList.contains(`folder-set-target`)){
            
            //if( this.data.source ==  id  ) return alert('源和目标不能是同一单词');
                
            this.data.target = id;
            smenu.classList.remove(`folder-set-target`);
            let tar = Doc.api.query(`${this.data.root} .folder-tree-target`);
            if( !tar ) return;
            tar.parentElement.removeChild(tar);
          }
          
          this.item.pinkTarget();
          
        },
        
        pinkTarget : ()=>{
          
          let pink = (id)=>{
            
            if( id == null ) return;
            
            let str =[
              this.data.root,
              `folder-tree-item[data-tree-id='${id}']`
            ].join(' .');
            
            let item = Doc.api.query(str);
            if( item == null ) return;
            
            let text = item.querySelector('.folder-tree-text');
            if( text == null ) return;
            
            text.classList.add('folder-tree-pink');
            
          }
          
          for( let src of this.data.source){
            if( src != undefined) pink(src);
          }
          let tar = this.data.target;
          if( tar != undefined) pink(tar);
          
        },
        
        clearPinkTree : ()=>{
          
          let str = `${this.data.root} .folder-tree-pink`;
          
          let objs = Doc.api.queryAll(str);
          
          //$lg('5613',objs.length);
          
          if( objs == null ) return;
          
          objs.forEach( obj =>{
            obj.classList.remove('folder-tree-pink')
          })
          
        },
        
        emptyPopMenu : (id)=>{
          
          let str = `${this.data.root} .folder-tree-ok`;
          if( Doc.has(str) ) return;
          
          
          for( let item of this.data.arr){
            if( item.id == id){ 
              if( item.up > -1) return 0;
            }
          }
          
          this.subMenu.index(id);
          
        }
        
      }
      
      dataObj = {
        
        removeChild : (id)=>{
          
          for(let i=0; i<this.data.arr.length; i++){
            let item = this.data.arr[i];
            if(item.up == id){
              this.data.arr.remove(i);
            }
          }
          
        },
        
        getItem : (id)=>{
          $lg('6215::bgo',id);
          for(let item of this.data.arr){
            $lg(JSON.stringify(item));
            if(item.id === id){
              return item
            }
          }
          return null;
          
        },
        
        getMaxId : ()=>{
          
          let max = 0;
          for(let item of this.data.arr){
            if(item.id > max){
              max = item.id
            }
          }
          return max;
          
        },
        
        add : (arr)=>{
          
          for(let item of arr){
            this.data.arr.push(item)
          }
          
        },
        
        remove : (id)=>{
          
          for(let i=0; i<arr.length; i++){
            let item = arr[i];
            if( item.id == id){
              this.data.arr.remove(i)
            }
          }
          
        },
        
      }
      
      fn = {

        removeSubItem : (item)=>{
            
            let child = item.children;
            if( child.length > 0 ){
              for(let chd of [...child]){
                let cidx = chd.getAttribute('data-ajs-idx');
                //$lg('3629::chd.idx',cidx);
                if(chd.className.indexOf('folder-tree-line') == -1 )
                  { chd.parentNode.removeChild(chd); }
              }
            }
        },

        clearAll : ()=>{
          
          let root = Doc.api.query(this.data.root);
          if( root ) root.innerHTML = '';
          
        },

        showSubMenu : (caid)=>{
          
          
          
        },

        getDataOf : (id)=>{
            
            for(let item of this.data.arr){
              
              if(item.id == id) 
                  return item;
              
            }
            
            return null;
            
          },
          
        getMaxId : ()=>{
            
            let max = -1;
            for(let item of this.data.arr){
              if(item.id > max) max = item.id
            }
            
            return max;
            
          },
          
        getMaxOrder : ()=>{
            
            let max = -1;
            for(let item of this.data.arr){
              if(item.od > max) max = item.od
            }
            
            return max;
            
          },
          
        highlight : (ds)=>{
          
          if( ds.classList.contains('folder-tree-item')) return;
          if( ds.classList.contains('folder-tree-line')) return;
          if( ds.classList.contains('folder-tree-box')) return;
          if( ds.classList.contains('folder-tree')) return;
          
          let lightUp = (clazz)=>{
            
            let target = [
              this.data.root,
              'folder-tree',
              clazz
            ].join(' .');
            
            let obj = Doc.api.query(target);
            if( obj ) obj.classList.remove(clazz);
            
            ds.classList.add(clazz);
          }
          
          lightUp('yelack');
          
        },
        
        

      }
      
      
      
    }
    
    upload       = class{
      
      constructor(){
        
        this.data = {
        
          root : null,
          
          event : {},
          
          arr : [],
          
          css :{
            
            maxHeight : '800px',
            
          },
          
          source : [],
          
        }
        
      }
      
      conf = {
        
        root : (queryStr)=>{
          
          this.data.root = queryStr;
          return this.conf;
          
        },
        
        arr  : (arr)=>{
          
          for(let item of arr){
            this.data.arr.push(item)
          }
          
          return this.conf;
          
        },
        
        maxHeight : (str)=>{
          
          this.data.css.maxHeight = str;
          return this.conf;
          
        },
        
        onExpand : (callback)=>{
          this.data.event.onExpand = callback;
          return this.conf;
          
        },
        
        onFold : (callback)=>{
          this.data.event.onFold = callback;
          return this.conf;
          
        },
        
        onClickText : (callback)=>{
          this.data.event.onClickText = callback;
          return this.conf;
          
        },
        
        onMoveOk : (callback)=>{
          this.data.event.onMoveOk = callback;
          return this.conf;
          
        },
        
        onMoveUp : (callback)=>{
          this.data.event.onMoveUp = callback;
          return this.conf;
          
        },
        
        onMoveDown : (callback)=>{
          this.data.event.onMoveDown = callback;
          return this.conf;
          
        },
        
        onEdit : (callback)=>{
          this.data.event.onEdit = callback;
          return this.conf;
          
        },
        
        onDelete : (callback)=>{
          this.data.event.onDelete = callback;
          return this.conf;
          
        },
        
        onHide : (callback)=>{
          this.data.event.onHide = callback;
          return this.conf;
        },
        
        clazz : (str)=>{
          
          this.data.clazz = str;
          return this.conf;
          
        },
        
        id : (str)=>{
          
          this.data.id = id;
          return this.conf;
          
        },
        
        //
        color : (str)=>{
          this.data.color = str;
          return this.conf;
        }
        
      }
      
      index = ()=>{
        
        let css = (()=>{
          
          if(Dic.has(`style[class*='ajs-upload-box']`)) return;
          
          Css.root = 'Ajs/ui/upload';
          
          new Css('.ajs-upload-box',{
            width           : '96%',
            height          : '70%',
            top             : '0px',
            //margin          : '6px',
            //padding         : '6px',
            
          })//.ajs-upload-box
          new Css('.ajs-upload-pg',{
            width           : '96%',
            height          : '70%',
            top             : '0px',
            //margin          : '6px',
            //padding         : '6px',
            
          })//.ajs-upload-pg
          new Css('.ajs-upload-pv',{
            height          : '96%',
            border_radius   : '10px',
            background      : 'lightgreen',
          })//.ajs-upload-pv
          new Css('.ajs-upload-pc',{
            display         : 'block',
            position        : 'absolute',
            top             : '20px',
            left            : '40%',
            height          : 'auto',
            min_width       : '100px',
            border_radius   : '10px',
            background      : 'white',
            color           : 'black',
            z_index         : 10,
            font_size       : '4vmin',
          })//.ajs-upload-pc
          
          Css.root = 'Ajs';
          
        })()
        
        let htm = (()=>{
          
          let id    = this.data.id    == null ? '' : this.data.id;
          let clazz = this.data.clazz == null ? '' : this.data.clazz;
          
          let html = new Html();
          html.dom(this.data.root)
              .div(`#${id}`,`.ajs-upload-box ${clazz} flex-col-7`).top()
                  .on.click(this.event.center,0)
                  .div(0,'.ajs-upload-pg flex-row-4').as(1)
                      .span(1,'.ajs-upload-pv')
                      .span(1,'.ajs-upload-pc')
              .ok();
        })()
        
        if(this.event.onIndex)
           this.event.onIndex();
           
      }
      
      event = {
        
        center : (e)=>{
          let ds = e.target;
          let dp = ds.parentNode;
          let clazz = (name)=>{ return ds.classList.contains(name); }
          
          //alert(e.tyoe)
          
          if( e.type == 'click'){
            
            //$lg('ajs:4787:className::bgy',ds.className);
            
            
            
            if( clazz( 'folder-tree-menu' )){
              this.event.clickItemMenu(e,ds)
            }else
            if( clazz( 'folder-tree-box' )){
              this.event.clickItemMenu(e,ds)
            }else
            if( clazz( 'folder-dot-menu' )){
              this.event.clickItemMenu(e,ds)
            }else
            
            if( clazz( 'folder-tree-text' )){
              this.event.clickItemText(e,ds)
            }else
            if( clazz( 'folder-tree-box' )){
              this.event.clickItemText(e,ds)
            }else
            
            if( clazz( 'folder-tree-close' )){
              this.subMenu.event.clickClose(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-edit' )){
              this.subMenu.event.clickEdit(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-move' )){
              this.subMenu.event.clickMove(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-move2' )){
              this.subMenu.event.clickMove2(e,ds,dp)
            }else
            
            if( clazz( 'folder-multi-target' )){
              this.subMenu.event.clickMultiTarget(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-top' )){
              this.subMenu.event.clickTop(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-row' )){
              this.subMenu.event.clickRow(e,ds,dp)
            }else
           
            if( clazz( 'folder-tree-col' )){
              this.subMenu.event.clickCol(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-up' )){
              this.subMenu.event.clickUp(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-down' )){
              this.subMenu.event.clickDw(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-delete' )){
              this.subMenu.event.clickDelete(e,ds,dp)
            }else
            
            if( clazz( 'folder-reset-order' )){
              this.subMenu.event.clickResetOrder(e,ds,dp)
            }else
            
            if( clazz( 'click-hide-title' )){
              this.subMenu.event.clickHideTitle(e,ds,dp)
            }else
            
            if( clazz( 'folder-tree-ok' )){
              this.subMenu.move.event.clickOk(e,ds,dp)
            }
            
            this.fn.highlight(ds);
            
          }
          
        },
        
        clickItemMenu : (e,ds)=>{
          //let ds = e.target;
          let dp = ds.parentElement;
          let id = dp.getAttribute('data-tree-id');
          //$lg('ajs:4828::clickMenu:id',id);
          this.subMenu.index(id)
          
        },
        
        clickItemText : async (e,ds)=>{
          
          try{
            //$lg('5064::bgy',ds.className);
            //let ds = e.target;
            let item = ds.parentElement;
            
            let id = item.getAttribute('data-tree-id');
            id = parseInt(id);
            //$lg('5071::bgb',id);
            
            item = Doc.api.query(`.folder-tree-item[data-tree-id='${id}']`);
            //$lg('5072::bgg',item.className);
            
            if(this.data.event.onClickText){ 
              this.data.event.onClickText()
            }
               
            this.item.setTarget(id);
            
            let st = item.getAttribute('data-tree-status');
            //$lg('5083::bgo',st == null,st);
            if( st == null || st == '0'){
              //download item
              // 展开
              //$lg('5089::bgg','展开');
              item.setAttribute('data-tree-status','1');
              this.item.updateChildren(id);
              if( this.data.event.onExpand ){
                let datItem = this.dataObj.getItem(id);
                let maxId = this.dataObj.getMaxId();
                this.data.event.onExpand(id,maxId,datItem);
              }
              //this.item.emptyPopMenu(id);
            }else{
              //$lg('5097::bgy','折叠');
              // 折叠，删除所有子项目
              item.setAttribute('data-tree-status','0');
              this.item.removeChildren(id);
              if( this.data.event.onFold ){
                this.data.event.onFold();
              }
            }
          }catch(e){
              $lg('5102::bgo',e.message)
            }
        
        },
      
      }
      
      subMenu = {
        
        index : (id = 0)=>{
          
          //$lg('ajs:4893:subMenu.index')
          
          //let ds = e.target;
          //let dpp = e.target.parentElement.parentElement;
          //let has = (...args)=> ds.classList.contains(...args);
          
          let dpp = `.folder-tree-item[data-tree-id='${id}']`;
          
          this.subMenu.fn.clearSubMenu();
          let h = new Html();
          h.dom( dpp )
              .div('.folder-tree-submenu flex-row-4').top()
                .at.data('data-tree-id',id)
                .button('.folder-tree-tool folder-tree-close','!\u00ab')
                .button('.folder-tree-tool folder-tree-up','!\u21d1')
                .button('.folder-tree-tool folder-tree-down','!\u21d3')
                .button('.folder-tree-tool folder-tree-move','!\u21d5')
                .button('.folder-tree-tool folder-tree-move2','!\u21f6')
                .button('.folder-tree-tool folder-tree-top','!\u21f1')
                .button('.folder-tree-tool folder-tree-row','!\u22ef')
                .button('.folder-tree-tool folder-tree-col','!\u22ee')
                .button('.folder-tree-tool folder-reset-order','!重排序号')
                .button('.folder-tree-tool folder-hide-title','!隐藏标题')
                .button('.folder-tree-tool folder-tree-edit','!\u270e')
                .button('.folder-tree-tool folder-tree-delete','!\u2297')
          
          h.ok();
        
        },
        
        event : {
          
          clickClose : (e,ds,dp)=>{
            
            this.subMenu.fn.clearSubMenu();
            
            this.item.clearPinkTree();
            
          },
          
          clickMove : (e,ds,dp)=>{
            
            this.subMenu.move.index();
            
            let obj = Doc.api.query(`${this.data.root} .yelack`);
            let id = obj.parentElement.parentElement.getAttribute('data-tree-id');
            
            this.data.source = parseInt(id);
            
            let str = `${this.data.root} .folder-tree-submenu`;
            let smenu = Doc.api.query(str);
            if( smenu ) smenu.classList.add('folder-set-target');
            
          },
          
          clickMove2 : (e,ds,dp)=>{
            
            this.subMenu.move2.index();
            
            let obj = Doc.api.query(`${this.data.root} .yelack`);
            let id = obj.parentElement.parentElement.getAttribute('data-tree-id');
            
            this.data.source = parseInt(id);
            
            let str = `${this.data.root} .folder-tree-submenu`;
            let smenu = Doc.api.query(str);
            //if( smenu ) smenu.classList.add('folder-set-target');
            
          },
          
          clickUp : (e,ds,dp)=>{
            
            let id = dp.getAttribute('data-tree-id');
                id = parseInt(id);
                
            let dataDs = this.fn.getDataOf(id);
            let od = dataDs.od - 1;
            
            if( od < 0 ) return;
            
            let tod = dataDs.od;
            let tid = this.item.getIdByOd(dataDs.od - 1);

            this.item.setOrderById(tid, tod);
            
            this.item.setOrderById(id, od);
            
            if(this.data.event.onMoveUp)
               this.data.event.onMoveUp();

          },
          
          clickDw : (e,ds,dp)=>{
            
            
            let id = dp.getAttribute('data-tree-id');
                id = parseInt(id);
            
            // 检查是否已经在最底
            let max = 0;
            for(let item of this.data.arr){
              if( max < item.od ) max = item.od;
            }
            
            let dataDs = this.fn.getDataOf(id);
            let od = dataDs.od+1;
            
            let tid = this.item.getIdByOd(dataDs.od+1);
            let tod = dataDs.od;
            
            if( dataDs.od >= max ) return;
          
            this.item.setOrderById(tid, tod);
            
            this.item.setOrderById(id, od);
            
            if(this.data.event.onMoveDown)
               this.data.event.onMoveDown();
            
          },
          
          clickTop : (e,ds,dp)=>{
              this.subMenu.fn.clearToolAll();
              
              let id = dp.getAttribute('data-tree-id');
              let upid = 0;
              /*
              let rsp = await this.service.data.req('tableCata.update.upid',id,upid);
              if( rsp.da.rst == false ) return alert( rsp.da.msg );
              Doc.api.query('.cata-submenu .close').click();
              Doc.api.query('.panel-cata .panel-menu .list').click();
              */
          },
          
          clickRow : (e,ds,dp)=>{
              
              let obj = Doc.api.query(`${this.data.root} .yelack`);
              let id = obj.parentElement.parentElement.getAttribute('data-tree-id');
            
              let box = this.item.select(id,'box');
              
              box.style.flexDirection = 'row';
              
          },
          
          clickCol : (e,ds,dp)=>{
              
              //let obj = Doc.api.query(`${this.data.root} .yelack`);
              let id = ds.parentElement.getAttribute('data-tree-id');
            
              let box = this.item.select(id,'box');
              
              box.style.flexDirection = 'column';
              
          },
          
          clickEdit : (e,ds,dp)=>{
              let id = dp.getAttribute('data-tree-id');
              $lg('3558::id',id);
              this.subMenu.fn.clearToolAll();
              let fgm = this.subMenu.edit.index(id);
              this.fn.show( fgm );
              
          },
          
          clickDelete : (e,ds,dp)=>{
            
              let id = dp.getAttribute('data-tree-id');
              
              this.subMenu.fn.clearToolAll();
              let fgm = this.subMenu.del.index(id);
              dp.parentNode.appendChild( fgm );
              
          },
          
          clickResetOrder : (e,ds,dp)=>{
            
            //alert('clickResetOrder');
            
            $lg('5334::clickResetOrder::bgb');
            
            let obj = Doc.api.query(`${this.data.root} .yelack`);
            let id = obj.parentElement.parentElement.getAttribute('data-tree-id');
            $lg('id:',id);
            
            let i = -1;
            for( let item of this.data.arr){
              
              if( item.up == id ){
                i++;
                item.od = i;
              }
              
            }
            
            this.item.updateChildren(id);
              
            this.subMenu.fn.clearSubMenu();
              
          },
          
          clickHideTitleAll : (e,ds,dp)=>{
            
            
              
          },
          
        },
        
        move : {
            
            index : ()=>{
              this.subMenu.fn.clearToolAll();
              let htm = new Html()
              .dom('.folder-tree-submenu')
                  .at.data('data-msg','single')
                  .button('.folder-tree-tool folder-tree-close',`!\u00ab`)
                  //.button('.folder-tree-tool folder-tree-source',`!点击item`)
                  //.button('.folder-tree-tool folder-tree-arrow',`!=>`)
                  .button('.folder-tree-tool folder-tree-target',`!点击目的地`)
                  .button('.folder-tree-tool folder-tree-ok',`!ok`)
              .ok();
              /*
              let source = [
                this.data.root,
                //'folder-tree-item',
                'yelack'
              ].join(' .');
              
              $lg('target::bgb',source);
              
              let target = Doc.api.query(source);
              $lg('target::bgb',target);
              
              if( !target ) return;
              let item = target.parentElement;
              if( !item ) return;
              
              let text = item.querySelector('.folder-tree-text');
              if( !text ) return;
              
              text.classList.add('folder-to-move'); 
              */
              this.item.pinkTarget();
              
            },
            
            event : {
              
              clickOk : (e,ds,dp)=>{
                
                let src = this.data.source;
                let tar = this.data.target;
                
                //alert(`src:${src}\ntar:${tar}`);
                if( src == null || tar == null ) return;
                if( src ==  tar  ) return alert('源和目标不能是同一单词');
                
                for( let item of this.data.arr){
                  
                  if( item.id == src ){
                    
                    item.up = tar
                    
                  }
                  
                }
                
                if(this.data.event.onMoveOk)
                   this.data.event.onMoveOk(it.id,tar);
                
                this.subMenu.fn.clearSubMenu();
                
                this.item.remove(src);
                
                this.item.clearPinkTree();
                
                this.data.source = null;
                this.data.target = null;
                
              }
              
            }
            
            
          },
          
        move2 : {
            
            index : ()=>{
              this.subMenu.fn.clearToolAll();
              let htm = new Html()
              .dom('.folder-tree-submenu')
                  .at.data('data-msg','multi')
                  .button('.folder-tree-tool folder-tree-close',`!\u00ab`)
                  //.button('.folder-tree-tool folder-tree-source',`!点击item`)
                  //.button('.folder-tree-tool folder-tree-arrow',`!=>`)
                  .button('.folder-tree-tool folder-tree-target folder-multi-target',`!开始多选`)
                  .button('.folder-tree-tool folder-tree-ok',`!ok`)
              .ok();
              /*
              let source = [
                this.data.root,
                //'folder-tree-item',
                'yelack'
              ].join(' .');
              
              $lg('target::bgb',source);
              
              let target = Doc.api.query(source);
              $lg('target::bgb',target);
              
              if( !target ) return;
              let item = target.parentElement;
              if( !item ) return;
              
              let text = item.querySelector('.folder-tree-text');
              if( !text ) return;
              
              text.classList.add('folder-to-move'); 
              */
              this.item.pinkTarget();
              
            },
            
            event : {
              
              clickMultiTarget : (e,ds,dp)=>{
                
                let smenu = Doc.api.query('.folder-tree-submenu');
                if( !smenu ) return;
                
                smenu.setAttribute('data-msg','finish');
                
                ds.innerText = '选择目的地';
                
                
              },
              
              clickOk : (e,ds,dp)=>{
                
                let src = this.data.source;
                let tar = this.data.target;
                
                //alert(`src:${src}\ntar:${tar}`);
                if( src == null || tar == null ) return;
                if( src ==  tar  ) return alert('源和目标不能是同一单词');
                
                for( let item of this.data.arr){
                  
                  if( item.id == src ){
                    
                    item.up = tar
                    
                  }
                  
                }
                
                if(this.data.event.onMoveOk)
                   this.data.event.onMoveOk(it.id,tar);
                
                this.subMenu.fn.clearSubMenu();
                
                this.item.remove(src);
                
                this.item.clearPinkTree();
                
                this.data.source = null;
                this.data.target = null;
                
              }
              
            }
            
            
          },
        
        del  : {
          index : (id)=>{
          
            let htm = new Html()
            .dom()
                .div('.cata-submenu submenu-del flex-row-5').top()
                  .data('id',id)
                  .span('.btn cata-del-alert',`!del ?`)
  
                  .button('.btn cata-del-yes',`!yes`)
                  .button('.btn cata-del-no',`!no`)
              
            .queryAll('.btn').on.click((e)=>{return;},1)
            
            .query('.submenu-del').on.click( async(e)=>{
              let ds = e.target;
              this.ui.fn.highlight(e);
              let has = (a)=>{ return ds.classList.contains(a)};
              /*if( has('cata-move-close') ){
                ds.parentNode.parentNode.removeChild(ds.parentNode);
              }else*/
              if( has('cata-del-yes') ){
                //$lg('3556::dp.className',ds.parentNode.className,ds.parentNode.parentNode.className);
                let dp = ds.parentNode;
                let id = dp.getAttribute('data-ajs-id');
                
                let rsp = await this.service.data.req('tableCata.del',id);
                if( rsp.da.rst == false ) return alert( rsp.da.msg );
                Doc.api.query('.cata-submenu .close').click();
                Doc.api.query('.panel-cata .panel-menu .list').click();
              }else 
              if( has('cata-del-no') ){
                //$lg('3556::dp.className',ds.parentNode.className,ds.parentNode.parentNode.className);
                
                Doc.api.query('.cata-submenu .close').click();
                
              }
            },0);
            
            return htm.pack();
          }
        },
        
        edit : {
          index : (caid)=>{
            
            let htm = new Html().dom()
            .div('.pan cata-edit-box flex-col-5').top()
              .data('temp',caid)
              .input.text('.btn cata-edit-input')
              .button('.btn cata-edit-ok',`!ok`)
                .on.click(async (e)=>{
                  
                  let ds = e.target;
                  let dp = e.target.parentNode;
                  
                  let name = dp.firstChild.value.trim();
                  
                  let id = dp.getAttribute('data-ajs-temp');
                  
                  if( name == null || name.length == 0 ) return;
                  
                  let rsp = await this.service.data.req('tableCata.update.name',id,name);
                  
                  if( rsp.da.rst == false ){ return  alert( rsp.da.msg ) };
                  
                  this.fn.hide();
                  Doc.api.query('.panel-cata .panel-menu .list').click();
                  
                },0);
            
            return htm.pack();
            
          },
        },
        
        fn : {

          clearToolAll : ()=>{
              [...Doc.api.queryAll('.folder-tree-tool')].forEach(obj=>{
                obj.parentNode.removeChild(obj);
              })
          },
          
          clearSubMenu : ()=>{
              [...Doc.api.queryAll('.folder-tree-submenu')].forEach(obj=>{
                obj.parentNode.removeChild(obj);
              })
          },
          
          
        
        },
        
      }
      
      item = {
        ////////////////////////////////////////////////
        // arr 参数格式要求
        ////////////////////////////////////////////////
        //   id : number，整型，本体代号
        //   up : number，整型，表示上家
        //   od : number，整型, 表示顺序排列(order)
        // text : string，字符串, 表示显示文本内容
        // [
        //    { id:0, up:0, order:1,  text:'word'}, 
        //    ..
        // ]
        ////////////////////////////////////////////////
        add : ( arr,top = null )=>{
          try{
            $lg('3554::add::items::arr',JSON.stringify(arr));
            
            if( arr.length == 0 ) return;
            
            let htm = new Html();
          
            let check = (id)=>{
              for( let a of this.data.arr ){
                  if(a.id == id) return 1
              }
              return 0
            }
            
            for( let item of arr ){
              
              let   id = item.id;
              let   up = item.up;
              let   od = item.od;
              let text = item.text;
              let type = item.type; //0:普通 1:box
              let dir  = item.dir;  // 排列方向，1:横，0:竖
              let flex = item.flex; // flex-col-46
              let fold = item.fold; // 折叠
              let tid   = item.tid == null ? '' :`#${item.tid}` ; // text-id
              let clazz = item.clazz == null ? '' : ` ${item.clazz}` ; // text-class
              
              /*
              if(check(id) == 0){
                this.data.arr.push(item);
              };*/
              $lg('arr::bgb',id,up,od,text);
              
              top = this.data.root + ' .folder-tree';
              
              
              if( up >= 0 ){
                
                top = [
                  this.data.root,
                  //'.folder-tree',
                  //`.folder-tree-item`,
                  `.folder-tree-box[data-tree-id='${up}']`,
                ].join(' ');
              }
              
              let tobj = Doc.api.query(top);
              if( !tobj ){ 
                $lg('6006::bgo',id,top,tobj)
                //return;
              }else{
                tobj.innerHTML = '';
              }
              dir  = dir == 0 ? 'col' : 'row';
              flex = `flex-${dir}-${flex}`;
              
              fold = fold == 0 ? 'expand' : 'fold';
              fold = `folder-tree-${fold}`;
              let obj = Doc.api.query(top);
              //$lg('5504::bgb',obj);
              
              
              
              htm.dom( top );
              if(type == 0){
                htm.div(`.folder-tree-item flex-col-7`).top()
                  .at.data('data-tree-id',id)
                  .at.style(`order:${od}`)
                  .div(`.folder-tree-line flex-row-4`).as(1)
                      .at.data('data-tree-id',id)
                      .button(1,tid,`.folder-tree-menu`)
                      .span(1,`${tid}`,`.folder-tree-text${clazz}`,`!${text}`)
                          //.at.data('data-tree-id',id)
                  .div(`.folder-tree-box ${flex} ${fold}`).as(1)
                      .at.data('data-tree-id',id)
              }else
              if(type == 1){
                htm.div(`.folder-tree-item flex-col-7`).top()
                  .at.data('data-tree-id',id)
                  .at.style(`order:${od}`)
                  .div(`.folder-tree-line flex-row-4`).as(1)
                      .at.data('data-tree-id',id)
                      .button(1,`.folder-dot-menu`)
                      .span(1,`${tid}`,`.folder-tree-text folder-tree-empty${clazz}`,`!${text}`)
                  .div(`.folder-tree-box ${flex} ${fold}`).as(1)
                      .at.data('data-tree-id',id)
              }

            }
            
            htm.ok();
          }catch(e){
              $lg('5535::bgo',e.message)
          }
        },
        
        select : (id,which='item')=>{
          
          if(!['item','menu','text','box'].includes(which)) return null;
          
          let arr = [
            this.data.root,
            'folder-tree',
            `folder-tree-${which}[data-tree-id='${id}']`
          ]
            
          return Doc.api.query( arr.join(' .'));

        },
        
        getByOrder : (od,which='item')=>{
          
          if(!['item','menu','text'].includes(which)) return null;
          
          let id = null;
          
          for(let item of this.data.arr){
            
            if( item.od == od ) id = item.id
            
          }
          
          if( id == null ) return null;
          
          let arr = [
            this.data.root,
            'folder-tree',
            `folder-tree-${which}[data-tree-id='${id}']`
          ]
            
          return Doc.api.query( arr.join(' .'));

        },
        
        getIdByOd : (od)=>{
          
          
          let id = null;
          
          for(let item of this.data.arr){
            
            if( item.od == od ) id = item.id
            
          }
          
          return id;
      
        },
         
        remove : (id)=>{
          
          let obj = this.item.select(id);
          
          if( obj ) obj.parentElement.removeChild(obj);

        },
        
        clearAll : ()=>{
          let arr = [
            this.data.root,
            'folder-tree',
            'folder-tree-item'
          ]
            
          let objs = Doc.api.queryAll( arr.join(' .'));
          
          if( !objs ) return;
          
          for( obj of objs){
            
            obj.parentElement.removeChild(obj);
            
          }
          
        },
        
        setOrderById : (id,order)=>{
          
          for(let item of this.data.arr){
            if(item.id === id){
              item.od = order
            }
          }

          let obj = this.item.select(id);
          
          if( obj ) obj.style.order = order;
          
        },
        
        setOrderByOd : (od,order)=>{
          
          let id = null;
          
          for(let item of this.data.arr){
            if(item.od === order){
              id = item.id
            }
          }
          if( id == null )  return;
          
          let obj = this.item.select(id);
          
          if( obj ) obj.style.order = order;
          
        },
        
        setOrderUp : (id)=>{
          
          let obj = this.item.select(id);
          
          let od = 0;
          for(let item of this.data.arr){
            if(item.id === id){
              od = item.order-1 == 0 ? item.order-1 : 0;
              item.od = od;
            }
          }
          if( obj ) obj.style.order = od;

        },
        
        setOrderDw : (id)=>{
          
          let obj = this.item.select(id);
          $lg('5218::bgo',obj);
          let od = 0;
          for(let item of this.data.arr){
            if(item.id == id){
              od = item.od+1;
              item.od = od;
            }
          }
          if( obj ) obj.style.order = od;

        },
        
        setText : (id,txt)=>{
          
          let obj = this.item.select(id,'text');
          
          if( obj ) obj.innerText = txt;
          
          for(let item of this.data.arr){
            if(item.id === id){
              item.text = txt
            }
          }

        },
        
        getText : (id)=>{
          
          let obj = this.item.select(id,'text');
          
          if( obj ) return obj.innerText;
          
          return null;

        },
        
        setUpObj : (id,up)=>{
          
          let obj = this.item.select(id);
          
          if( obj ) obj.innerText = txt;
          
          for(let item of this.data.arr){
            if(item.id === id){
              item.up = up
            }
          }
          
          

        },
        
        updateChildren : (id)=>{
          
          //$lg('5707','updateChildren');
          
          this.item.removeChildren(id);
          
          let arr = [];
          for(let item of this.data.arr){
            if(item.up === id){
              arr.push(item);
            }
          }
          
          this.item.add(arr);

        },
        
        removeChildren : (id)=>{
          
          let box = this.item.select(id,'box');
          
          if( box ) box.innerHTML = '';
          
          //if( obj ) obj.innerHTML = '';
          /*
          let child = item.children;
          if( child.length > 0 ){
            for(let chd of [...child]){
              if(chd.classList.contains('folder-tree-item'))
                { chd.parentElement.removeChild(chd); }
            }
          }
          */
          
        },
        
        setOd : (id,od)=>{
          
        },
        
        setTarget : (id)=>{
          
          let smenu = Doc.api.query(`${this.data.root} .folder-tree-submenu`);
          if( !smenu ) return;
          
          let msg = smenu.getAttribute('data-msg');
          
          if( smenu.classList.contains(`folder-set-source`)){
            this.data.source.push(id);
            if( msg == 'single' || msg == 'finish' ){
              smenu.classList.remove(`folder-set-source`);
              smenu.classList.add(`folder-set-target`);
            }else
            if( msg == 'multi'){
              let multi = Doc.api.query(`${this.data.root} .folder-multi-target`);
              if( !multi ) return;
              multi.innerText = '点此结束多选';
            }
          }else
          if( smenu.classList.contains(`folder-set-target`)){
            
            //if( this.data.source ==  id  ) return alert('源和目标不能是同一单词');
                
            this.data.target = id;
            smenu.classList.remove(`folder-set-target`);
            let tar = Doc.api.query(`${this.data.root} .folder-tree-target`);
            if( !tar ) return;
            tar.parentElement.removeChild(tar);
          }
          
          this.item.pinkTarget();
          
        },
        
        pinkTarget : ()=>{
          
          let pink = (id)=>{
            
            if( id == null ) return;
            
            let str =[
              this.data.root,
              `folder-tree-item[data-tree-id='${id}']`
            ].join(' .');
            
            let item = Doc.api.query(str);
            if( item == null ) return;
            
            let text = item.querySelector('.folder-tree-text');
            if( text == null ) return;
            
            text.classList.add('folder-tree-pink');
            
          }
          
          for( let src of this.data.source){
            if( src != undefined) pink(src);
          }
          let tar = this.data.target;
          if( tar != undefined) pink(tar);
          
        },
        
        clearPinkTree : ()=>{
          
          let str = `${this.data.root} .folder-tree-pink`;
          
          let objs = Doc.api.queryAll(str);
          
          //$lg('5613',objs.length);
          
          if( objs == null ) return;
          
          objs.forEach( obj =>{
            obj.classList.remove('folder-tree-pink')
          })
          
        },
        
        emptyPopMenu : (id)=>{
          
          let str = `${this.data.root} .folder-tree-ok`;
          if( Doc.has(str) ) return;
          
          
          for( let item of this.data.arr){
            if( item.id == id){ 
              if( item.up > -1) return 0;
            }
          }
          
          this.subMenu.index(id);
          
        }
        
      }
      
      dataObj = {
        
        removeChild : (id)=>{
          
          for(let i=0; i<this.data.arr.length; i++){
            let item = this.data.arr[i];
            if(item.up == id){
              this.data.arr.remove(i);
            }
          }
          
        },
        
        getItem : (id)=>{
          $lg('6215::bgo',id);
          for(let item of this.data.arr){
            $lg(JSON.stringify(item));
            if(item.id === id){
              return item
            }
          }
          return null;
          
        },
        
        getMaxId : ()=>{
          
          let max = 0;
          for(let item of this.data.arr){
            if(item.id > max){
              max = item.id
            }
          }
          return max;
          
        },
        
        add : (arr)=>{
          
          for(let item of arr){
            this.data.arr.push(item)
          }
          
        },
        
        remove : (id)=>{
          
          for(let i=0; i<arr.length; i++){
            let item = arr[i];
            if( item.id == id){
              this.data.arr.remove(i)
            }
          }
          
        },
        
      }
      
      fn = {

        removeSubItem : (item)=>{
            
            let child = item.children;
            if( child.length > 0 ){
              for(let chd of [...child]){
                let cidx = chd.getAttribute('data-ajs-idx');
                //$lg('3629::chd.idx',cidx);
                if(chd.className.indexOf('folder-tree-line') == -1 )
                  { chd.parentNode.removeChild(chd); }
              }
            }
        },

        clearAll : ()=>{
          
          let root = Doc.api.query(this.data.root);
          if( root ) root.innerHTML = '';
          
        },

        showSubMenu : (caid)=>{
          
          
          
        },

        getDataOf : (id)=>{
            
            for(let item of this.data.arr){
              
              if(item.id == id) 
                  return item;
              
            }
            
            return null;
            
          },
          
        getMaxId : ()=>{
            
            let max = -1;
            for(let item of this.data.arr){
              if(item.id > max) max = item.id
            }
            
            return max;
            
          },
          
        getMaxOrder : ()=>{
            
            let max = -1;
            for(let item of this.data.arr){
              if(item.od > max) max = item.od
            }
            
            return max;
            
          },
          
        highlight : (ds)=>{
          
          if( ds.classList.contains('folder-tree-item')) return;
          if( ds.classList.contains('folder-tree-line')) return;
          if( ds.classList.contains('folder-tree-box')) return;
          if( ds.classList.contains('folder-tree')) return;
          
          let lightUp = (clazz)=>{
            
            let target = [
              this.data.root,
              'folder-tree',
              clazz
            ].join(' .');
            
            let obj = Doc.api.query(target);
            if( obj ) obj.classList.remove(clazz);
            
            ds.classList.add(clazz);
          }
          
          lightUp('yelack');
          
        },

        ok : async ()=>{
          
          let showResult = (rsp,msg=null)=>{
            let h = new Html();
            h.dom('.panel-cont');
            if(rsp.da.rst == false ){
              h.div('.panel-item').as(0)
                  .span(`!${rsp.da.rst}`,0)
                      .at.style('backgroundColor','hsl(0,50%,50%)')
              .div('.panel-item').as(1)
                  .span(`!${rsp.da.msg}`,1)
                      .at.style('backgroundColor','hsl(38,100%,50%)');
              $log.lgg('3774::err::bgo',JSON.stringify(rsp));
            }else{
              
              h.div('.panel-item').as(0)
                  .span(`!${rsp.da.rst}`,0)
                      .at.style('backgroundColor','hsl(60,50%,50%)');
              
            }
            h.ok();
          }
          
          let thiz = this.ui.tabMenu.tabs.song.add;
          //thiz.fn.cleanContent();
          //return;

          let mp3_name = thiz.dat.mp3_name;
          let mp3_part = thiz.dat.mp3_part;
          let mp3_pid  = thiz.dat.mp3_pid;
          let text_name = thiz.dat.text_name;
          let text_ext  = thiz.dat.text_ext;
          
          let name = text_name;
          if(name == null) name = mp3_name;
          if(name == null) {
            alert('2241::both textName and mp3Name are empty');
            return;
          }

          let content = document.body.querySelector('.lrc-cont');
          if( content ) {
            content = content.value;
          }else{
            return alert('至少需要添加一个文本');
          }  
          //$lg('5450',content);
          // 歌曲信息，歌手，标题等
          let rst = await this.service.data.req('tableSong.add',name,mp3_part,mp3_pid);
          if( rst.da.rst == false ) return alert('5420:tableSong.add fail\n'+rst.da.msg);
          
          //歌曲id
          let sid = await this.service.data.req('tableSong.getLastId',);
          if( sid == false ) return alert('5423:tableSong.getLastId fail');
          
          //objLrc处理
          this.songId = sid;
          this.objLrc = this.obj.lrc(this);
          
          
          if(text_ext == 'json')
                this.objLrc.addJson( sid, content );
          else  this.objLrc.addText( content );
          //let rspLrcAdd = await this.service.data.req('tableWord.batAdd',sid,lrc);
          
          //处理后添加到word表
          let rspLrcAdd = await this.dat.tableWord.batAdd(sid,this.objLrc);
              //$lg('1593::rspLrcAdd',JSON.stringify(rspLrcAdd));
              showResult(rspLrcAdd);
              
          //添加到mp3表
          if( mp3_part && mp3_pid ){
            
              let rspMp3Add = await this.service.data.req('tableSong.lockMedia',sid, mp3_part, mp3_pid);
              showResult(rspMp3Add);
              
          }
            
            
        },
        
        read_mp3_data : (file)=>{
          
          return new Promise((ok)=>{
            let reader = new FileReader();
                //reader.readAsBinaryString(f1)
                reader.readAsArrayBuffer(file)
                reader.onload = (e)=>{
                  //$log.lgg('3612::text',f1.name,this.result);
                  //let m = /.+\.([a-zA-Z]{3,4})$/.match(f1.name);
                  ok(e.target.result);
                  
                }
          })

          
        },
        
        media_upload : async (e)=>{ 
          const token = performance.now().toFixed(0);
          $lg('this is media_upload',`token:${token}`);
          let thiz = this.ui.tabMenu.tabs.song.add;
          let ds = e.target;
          let f1 = ds.files[0];
          
          /*let ppt = Reflect.getPrototypeOf(f1);
          let keys = Reflect.ownKeys(ppt);
          $lg('4976:file.ownKeys',...keys);*/
          //$lg('4976:webkitRelativePath',f1.webkitRelativePath);
          
          /*if(/^.+\.(mp3|wav|jpeg|txt|json)$/i.test(f1.name) == false){
              return alert('4982:mp3|wav was supported only');
          }*/
          
          let ext = null;
          let m = /^.+\.(\w+)$/i.exec(f1.name);
          if( m ) ext = m[1];
          else return alert(`4988:con't determine extended format:${ext}`);
          ext = ext.toString().toLowerCase();
          
          if( ['txt','json'].includes(ext) ){
            return thiz.fn.lrc_show(e);
          }
          
          let data = await thiz.fn.read_mp3_data(f1);
          //$lg('4977:read_mp3_data success');
          
          let pv = Doc.api.query('.pv');
          let pc = Doc.api.query('.pc');
          //$lg('4981',pv,pc);
          //let ms = performance.now();
          
          let mp3_part_num = await this.fn.shouldBeFission('mp3');
          if( mp3_part_num > -1 ) mp3_part_num = mp3_part_num.toString().padStart(4,'0');
          else return alert('5000:mp3_part_num应该>=0, 实际是-1');
          //ms = performance.now()-ms;
          //$lg('4994:after:shouldBeFission::bgg',ms);
          //return alert('mp3_part_num:'+mp3_part_num+'\nms:'+ms);
          
          document.addEventListener(`upload_pg_${token}`,(e)=>{
              try{
                /*let obj = JSON.parse(e.detail);
                let op = obj.op;
                let da = obj.da;*/
                //$lg('4990:got_upload_pg::bgg');
                let da = e.detail;
                if(f1.size > 0){
                  let val = parseFloat(da/f1.size)*100;
                  //$lg('10354',`da:${da},fsize:${f1.size},pc:${val}`);
                  pv.style.width = val + '%';
                  pc.innerText = parseInt(val) + '%';
                }
              }catch(e){
                $lg('4998:upload_pg:error::bgo',e.message)
              }
          })
            
          return new Promise((res)=>{
            
            document.addEventListener(`upload_done_${token}`,(e)=>{
              $lg(`5044:upload_done_${token}`);
              let op = 'data__save_as_blob';
              let da = {
                //file : '../app/dat/data.sqlite3',
                file  : `../app/dat/mp3_${mp3_part_num}.sqlite3`,
                media : f1.name,
                title : f1.name,
                ext   : ext,
                token : token,
              };
              let obj = {op,da};
              this.socket.send(JSON.stringify(obj));
              
              document.addEventListener(`save_as_blob_${token}`,(e)=>{
                //$log.lgg(JSON.stringify(e.detail));
                let da = e.detail;
                let rst = da.rst;
                let dat = da.dat;
                let msg = da.msg;
                if(rst == true){
                  thiz.dat.mp3_name  = f1.name;
                  thiz.dat.mp3_part  = parseInt(mp3_part_num);
                  thiz.dat.mp3_pid   = dat;
                  //let pc = Doc.api.query('.pc');
                  //pc.innerText = `库号:${mp3_part_num},id:${dat}`;
                  pc.innerText = 'success';
                  thiz.fn.mp3_show_info(f1.name,mp3_part_num,dat);
                  res(e.detail);
                }else{
                  pc.innerText = `rst:${rst},msg:${msg}`;
                }
                  
              })
              
            })
            
            let upload_data = {
              filename : f1.name,
              token    : token,
            }
            this.socket.send(JSON.stringify({op:'upload',da:upload_data}));
            this.socket.send(data);
            $lg('5004:this.socket.send(data); done');
          
          });
          
          //thiz.fn.mp3AddInfo(f1);
          //thiz.fn.mp3SetFile(f1);
        },
        /*
        mp3AddMedia : ()=>{
          let thiz = this.ui.tabMenu.tabs.song.add;
          let f1 = thiz.dat.mp3file;
          let addr = '../include/handler.php';
          let path = '../app/mp3/'+thiz.dat.mp3Name;
          let type = 'mp3';
          let op = 'file__upload';
          let da = {path:path,type:'mp3'};
          let fmda = new FormData();
              fmda.append("opda",JSON.stringify({op:op,da:da}));
              fmda.append("mp3",f1);
          return new Promise((ok,fail)=>{
            let xhr = new Xhr(addr);
            xhr.up(fmda);
            xhr.rsp((rsp)=>{
              $lg('1477::upload::dat',JSON.stringify(rsp));
              ok(rsp);
            },(rsp)=>{
              $lg('1479::upload::err::bgo',JSON.stringify(rsp));
              fail(rsp);
            })
          })
        },
        */
        
        mp3_show_info : (name, part, pid)=>{
          let thiz = this.ui.tabMenu.tabs.song.add;
              
          //let name = (f1.name).toString().replace('.mp3','');
          //thiz.dat.mp3Name = name;
          let c = Doc.api.query('.mp3-info');
            if(c){ c.innerHTML = ''; }
          let h = new Html();
          h.dom('.mp3-info')
              .div('.line1 flex-row-4').as(1)
                  .button('.btn media-info-name',`!${name}`,1)
                  
              .div('.line2 flex-row-4').as(2)
                  .button('.btn media-info-part',`!${part}`,2)
                  .button('.btn media-info-pid',`!${pid}`,2)
            .ok();
            
          //thiz.dat.name = name;
          
        },
        /*
        /*
        mp3SetFile : (f1)=>{
          let thiz = this.ui.tabMenu.tabs.song.add;
              thiz.dat.mp3file = f1;
        },
        mp3UploadFile : ()=>{
          let thiz = this.ui.tabMenu.tabs.song.add;
          let f1 = thiz.dat.mp3file;
          let addr = '../include/handler.php';
          let path = '../app/mp3/'+thiz.dat.mp3Name;
          let type = 'mp3';
          let op = 'file__upload';
          let da = {path:path,type:'mp3'};
          let fmda = new FormData();
              fmda.append("opda",JSON.stringify({op:op,da:da}));
              fmda.append("mp3",f1);
          return new Promise((ok,fail)=>{
            let xhr = new Xhr(addr);
            xhr.up(fmda);
            xhr.rsp((rsp)=>{
              $lg('1477::upload::dat',JSON.stringify(rsp));
              ok(rsp);
            },(rsp)=>{
              $lg('1479::upload::err::bgo',JSON.stringify(rsp));
              fail(rsp);
            })
          })
        },
        */
        
        lrc_show : (e)=>{
          let thiz = this.ui.tabMenu.tabs.song.add;
          let ds = e.target;
          //$lg('1313::className',ds.className);
          //let ks= Reflect.ownKeys(ds.files[0]);
          let f1 = ds.files[0];
          //let ppt = Reflect.getPrototypeOf(f1);
          //let ks = Reflect.ownKeys(ppt);
          //$lg('1316::ks',...ks);
          //$lg('1316::size,name,ext,cont',f1.size,f1.name,f1.extend,f1.toString());
          if(/^.+\.(txt|json)$/i.test(f1.name)){
            if(typeof FileReader == undefined) return;
            let fder = new FileReader();
                fder.readAsText(f1)
                fder.onload = function(e){
                  //$log.lgg('3612::text',f1.name,this.result);
                  //let m = /.+\.([a-zA-Z]{3,4})$/.match(f1.name);
                  let m = f1.name.split('.');
                  
                  thiz.fn.lrc_show_text(f1.name,m[1],this.result);
                }
          }
          
        },
        
        lrc_show_text : (name,ext,lrc)=>{
          //$lg('1347::lrcAddText');
          let thiz = this.ui.tabMenu.tabs.song.add;
              thiz.dat.text_name = name;
              thiz.dat.text_ext  = ext;
          let c = Doc.api.query('.lrc-cont');
          if(c){
            c.innerHTML = lrc;
            return
          }else{
            let h = new Html();
            h.dom('.lrc-info')
                .textarea(`#lrc-cont`,'.lrc-cont',`!${lrc}`)
              .ok();
            //let textObj = document.getElementById('lrc-cont');
            //$lg('5730::bgo','typeof textObj:',typeof textObj,textObj == null);
          
          }
        },
        
        
        
        cleanContent : ()=>{
          let chd = Doc.api.queryAll('.panel-cont>div:not(:first-child)');
          [...chd].forEach((c)=>{
            c.parentNode.removeChild(c);
          })
        },
        
        /*
        appendTo : (e)=>{
      
          let ds = e.target;
      
          let pars = this.ui.tabMenu.tabs.cata.pars;
          
              pars.where = 'body .msg-box .msg-cont';
          
          let idx = this.ui.tabMenu.tabs.cata.index();
          
          this.ui.tabMenu.tabs.cata.css();
          
          this.ui.msgbox.fn.show( idx );
      
          this.ui.tabMenu.tabs.cata.folderBox.list( 0, pars.where );
      
        },
        */
        
      }
      
    }
    
    
    
}

/**
 * frags[...frag]
 *      dom:frag : DocumentFragment
 *          style:style
 *            slt: sltor 
 *            kf : keyframes
 *                  pc : pcent
 */ 
//@css
export class Css extends Ajs{
  
  constructor(anyStr=null,obj=null){
    super();
    
        //this.pfix = pfix;
        //new Log();
        //$lg('3295::constructor::start',Log.now());
        Css.counter.instance ++;
        if(Css.counter.instance == 1){
          //this._css.keymap = new Map();
          this._css.autorun();
        }
        
        if(Css.cidx == undefined){
            //Html.didx = 0;
            let cidx = document.querySelectorAll[`style[data-ajs-cidx]`];
            if(cidx == undefined || cidx.length == 0) Css.cidx = 0
            else Css.cidx = cidx.length;
            
        }else{
            Css.cidx++;
        }
        
        this.cmds = [];
        this.fastMode = 0;
        
        
        this.lastExec = undefined;
        
        this.object    = undefined;
        this.topObject = undefined;
        this.styleObject = undefined;
        this.frags = this._css.obj.frags();
        this.dom('head');
        
        
        
        this.replica = 0;
        //$lg('3317::cs::constructor end',Log.now());
        
        /*
          //-------------------------------
          // fast mode :
          //-------------------------------
              new Css('html,body',{
                background : 'white',
              })
          //-------------------------------
              <html>
                <head>
                  <style class='cssAjs'>
                      <style class='html,body'>
                        html,body{
                          background : white;
                        }
                      </style>
                  </style>
                  ...
          //-------------------------------
            
        */
        if(typeof(anyStr) === 'string'){
          if(Array.isArray(obj) === false && typeof(obj) === 'object'){
            this.slt(anyStr,obj);
          }
        }
    
        
    
  }
  
  static counter = {
    instance : 0,
  }
  
  static root = 'Ajs';
  
  static keymap = new Map();
  
  //#dom(css)
  dom(...args){
    //$lg(`dom(${args[0]})`);    
    this.cmds.push('dom');
    
    let obj = this.docu.query(args[0]);

    if(this.inValid(obj)){
        obj = this.docu.query('head');
        //$lg(`2764:${args[0]} not exists::bgo`,`change to:dom('head')`,`input:${args[0]}`);
      
    }else {
      
        /*this.frags[this.fidx] = this.ofrag(args[0],obj);
        this.topObject = this.frags[this.fidx].frag;
        this.fidx++;*/
        
        this.frags.add(this._css.obj.frag(args[0],obj));
        this.topObject = this.frags.last();
        this.fidx++;
        this.object = this.topObject.top;
    }
    this.lastExec = 'dom';
    this.lastDom = args[0];
    //this.exeStack.push('dom');
    //$lg('html:246:_showFrags:');
    //this._showFrags();
    return this;
    
  }
  
  //#boss(css)
  boss(...args){
    
    this.cmds.push('boss');
    
    if(args.length == 0){
        this.topObject = this.styleObject;
    }else{
        //obj_style
        //args[0] =  this.pfix + args[0];
        
        this.topObject = this.frags.last().query(args[0]);
        //$lg('css::1498::this.topObject.id',this.topObject.id);
    }
    if(this.topObject == null){
        let msg =  'Css::boss:1507:\n';
            msg += 'this.topObject == null\n';
            msg += `your input is : boss( "${args[0]}" )\n`;
            msg += `are you mean  : boss( "${args[0].replace('#','')}" ) ?\n`;
        alert(msg);
    };
    return this;
  }
  
  //#style(css)
  style(id,clazz='',append=0){
    //$lg('2803::css::style::id::bgb',id);
    this.cmds.push('style');
    
    if(this.replica)return this;
    let oid = id;
    let idChain = '';
    if(Array.isArray(id)){
        let count = -1;
        
        for(let iid of id){
            count++;
            if(iid.charAt(0) !== '.'){
              idChain += ' '.repeat(count>0 ? 1 : 0) + '.'+iid;
            }else{
              idChain += ' '.repeat(count>0 ? 1 : 0) + iid;
            }
            //$lg('4175::idChain',idChain);
            //oid = this.pfix + iid;
            oid = iid;
            //let chk = this.docu.gbid(oid);
            let chk = Doc.api.query(idChain);
            if(chk){
                //$lg(`this.dom('#'+${iid});`);
                if(count == id.length-1) {
                  this.replica = 1;
                  return this;
                }
                this.dom(idChain);
                continue;
            }
            //dom('head')
            //style(['CssAjs','cssApp','cssBody'])
            //this.frags.last()  = frag
            //this.topObject.add = frag.add
            //#1.topObject == document.head
            //#2.topObject == DocStyle
            //#3.topObject == obj_frag
            //#4.topObject == obj_style
            //$lg('css::1524::this.topObject.type',this.topObject.type);
            if(this.topObject.type == undefined){
                //#1,#2 head,style appendChild style
                this.topObject.appendChild(this.docu.celm('style',oid,clazz));
                this.styleObject = this.topObject.querySelector('#'+oid);
                this.topObject = this.styleObject;
            }else if(this.topObject.type == 'frag'){
                //#3.topObject == obj_frag
                this.topObject.add(this._css.obj.style(oid,clazz));
                this.styleObject = this.topObject.last();
                this.topObject = this.styleObject;
            }else if(this.topObject.type == 'style'){
                //#4.topObject == obj_style
                this.topObject.add_child(this._css.obj.style(oid,clazz));
                this.styleObject = this.topObject.last_child();
                this.topObject = this.styleObject;
            }
        
        }
      
    }else if(typeof id == 'string'){
      //$lg(`css:1544:typeof id == 'string'`);
      //if(id=='cssBtn')$lg(`css:4028:id ==`,id);
      if(id.indexOf('/')>-1){
        let arr = id.split('/');
        return this.style(arr);
      }
      
      if(Doc.has(`${this.lastDom} .${id}`)){
        this.replica = 1;
        //return this;
      }
      oid =  id;  
      //$lg('css:1544:this.topObject.type',this.topObject.type);
      if(this.topObject.type == undefined){
          //#1,#2 head,style appendChild style
          this.topObject.appendChild(this.docu.celm('style',oid,clazz));
          this.styleObject = this.topObject.querySelector('#'+oid);
      }else if(this.topObject.type == 'frag'){
          //#3.topObject == obj_frag
          this.topObject.add(this._css.obj.style(oid,clazz));
          this.styleObject = this.topObject.last();
      }else if(this.topObject.type == 'style'){
          //#4.topObject == obj_style
          //$lg('css::1557::this.topObject.sty.id',this.topObject.sty.id);
          this.topObject.add_child(this._css.obj.style(oid,clazz));
          this.styleObject = this.topObject.last_child();
      }
      //$lg('css:4045:this.topObject.type',this.topObject.type);
    
      //this.topObject = this._gbid(oid);
    }
    //this.object = this.docu.gbid(oid);
    //alert(typeof this.object);
    return this;
  }

  //#slt(css)
  slt(...args){
      this.cmds.push('slt');
      //$lg(`3965::slt(...args)::bgo`,...args);
      if(this.replica)return this;
      
      let len = args.length;
      
      if(len == 0){
        
          return alert('Ajs::css::3572\n至少需要1个参数');
        
      }
      
      
      let a1 = args[0];
      let a2 = len < 2 ?   undefined : args[1];
      
      //$lg('3576::slt::len',len,typeof(a1));
      
      
      
      //slt('body')
      if( typeof(a1) === 'string' ){
          //$lg('3762::args',...args);
          
          let idx = this.cmds.indexOf('slt');
          if(idx == 1){
            this.fastMode = 1;
            let clazzName = a1.replace('.','\u2024').replace('#','\u266f').replace('*','\u2055')//\u2055;
            let arr = [...Css.root.split('/'),clazzName];
            this.style(arr);
            this.cmds.pop('style');``
            this.cmds.unshift('style');
          
          }
          
          if(this.styleObject == undefined)return;
          this.styleObject.add_slt(this._css.obj.sltor(a1));
          this.object = this.styleObject.last_slt();
          /*
          if(len == 2){
            $lg('3582::slt::args',...args,this.object.type);
          }*/
          
      }else{
        
        return alert('Ajs::css::4621\n第1个参数必须是字符串');
        
      }
      
      //slt('body',{})
      if( typeof(a2) === 'object' && Array.isArray(a2) === false ){
          let obj = a2;
          Reflect.ownKeys(obj).forEach((key)=>{
          //(obj.keys).forEach((key)=>{
              if(typeof(obj[key]) != undefined){
                  
                  let val = obj[key];
                  //this._css.val_key(val,key);
                  let ppt = Reflect.get(Css.prototype,key);
                  if(key == 'vertical_align'){
                    //$lg('4932:key:val',key,val);
                  }else
                  if( /[a-z]+\..+/i.test(key) ){
                    //$lg('6676::bgb',key);
                    //'flex.row'
                    const fn = Reflect.get(this,key);
                    $lg('6679::bgo','typeof fn',typeof fn,`${key}(${val})`);
                  }else
                  if(typeof(ppt)==='function'){
                    //$lg('ajs::4679::bgo',`typeof(ppt)==='function'`);
                    //ppt(val);//???
                    let key2 = Css.keymap.get(key);
                    if(key2)this._css.val_key(val,key2);
                  }else
                  {
                    this._css.val_key(val,key);
                  }
              }
          })
      }
      
      if(this.fastMode == 1){
        this.ok();
      }
      
      return this;
  }

  //#kfs(css keyframes)
  kf(name,webkit=''){
      this.cmds.push('kf');
      if(this.replica)return this;
      let kf = this._css.obj.kf(name,webkit);
      //$lg('1563:this.topObject.type',this.topObject.type);
      this.styleObject.add_kf(kf);
      //this.styleObject = this.styleObject.last_kf();
      //this.object = this.topObject.last();
      this.object = undefined;
      return this;
  }
  
  //#pc(css percent %)
  pc(num){
      this.cmds.push('pc');
      if(this.replica)return this;
      let pct = this._css.obj.pcent(num);
      //$lg('1574::this.topObject.type',this.topObject.type);
      //this.topObject = keyframes
      //this.styleObject.add(pct);
      this.styleObject.last_kf().add(pct);
      this.object = this.styleObject.last_kf().last();
      return this;
  }
  
  //#_ok
  ok(){
    this.cmds.push('ok');
    this.frags.out();
    this._css.reset();
    return this;
  }
  
  //#abbr
  a = {
      w    : (val)=>{ this._css.val_key( val,  'width' );  return this.a; },
      wh   : (w,h=w)=>{ this._css.val_key( w,    'width' );  this._css.val_key( h,  'height' ); return this.a; },
      marpad  : (m,p=m)=>{  this._css.val_key( m,  'margin' );  
                            this._css.val_key( p,  'padding' ); return this.a; },
      tl   : (t,l=t)=>{ this._css.val_key( t,    'top'   );  this._css.val_key( l,  'left'   ); return this.a; },
      tr   : (t,r=t)=>{ this._css.val_key( t,    'top'   );  this._css.val_key( r,  'right'  ); return this.a; },
      bl   : (b,l=b)=>{ this._css.val_key( b,    'bottom' ); this._css.val_key( l,  'left'   ); return this.a; },
      h    : (val)=>{ this._css.val_key( val,  'height');  return this.a; },
      t    : (val)=>{ this._css.val_key( val,  'top'   );  return this.a; },
      l    : (val)=>{ this._css.val_key( val,  'left'  );  return this.a; },
      r    : (val)=>{ this._css.val_key( val,  'right'  );  return this.a; },
      b    : (val)=>{ this._css.val_key( val,  'bottom'  );  return this.a; },
      rig  : (val)=>{ this._css.val_key( val,  'right'  ); return this.a; },
      top  : (val)=>{ this._css.val_key( val,  'top'  ); return this.a; },
      bot  : (val)=>{ this._css.val_key( val,  'bottom'  ); return this.a; },
      lef  : (val)=>{ this._css.val_key( val,  'left'  ); return this.a; },
      dsp  : {
          inl : {
              box  : ()=>{this._css.val_key(  this._css.spread( 'inl','box' ), 'display' );  return this.a; },
              flx  : ()=>{this._css.val_key(  this._css.spread( 'inl','flx' ), 'display' );  return this.a; },
              flxb : ()=>{this._css.val_key(  this._css.spread( 'inl','flxb'), 'display' );  return this.a; },
              blk  : ()=>{this._css.val_key(  this._css.spread( 'inl','blk' ), 'display' );  return this.a; },
              tbl  : ()=>{this._css.val_key(  this._css.spread( 'inl','tbl' ), 'display' );  return this.a; },


          },
          tbl    : {
              grp  : {
                  col  : ()=>{this._css.val_key(  this._css.spread( 'tbl','col','grp' ), 'display' );  return this.a ; },
                  foo  : ()=>{this._css.val_key(  this._css.spread( 'tbl','foo','grp' ), 'display' );  return this.a ; },
                  hea  : ()=>{this._css.val_key(  this._css.spread( 'tbl','hea','grp' ), 'display' );  return this.a ; },
                  row  : ()=>{this._css.val_key(  this._css.spread( 'tbl','row','grp' ), 'display' );  return this.a ; },
              },
              cap  : ()=>{this._css.val_key(  this._css.spread( 'tbl','cap' ), 'display' );  return this.a ; },
              row  : ()=>{this._css.val_key(  this._css.spread( 'tbl','row' ), 'display' );  return this.a ; },
              col  : ()=>{this._css.val_key(  this._css.spread( 'tbl','col' ), 'display' );  return this.a; },
              cell : ()=>{this._css.val_key(  this._css.spread( 'tbl','cell'), 'display' );  return this.a; },
          },
          flx    : ()=>{this._css.val_key(  this._css.spread( 'flx' ),    'display' );  return this.a; },
          box    : ()=>{this._css.val_key(  this._css.spread( 'box' ),    'display' );  return this.a; },
          flxb   : ()=>{this._css.val_key(  this._css.spread( 'flxb' ),   'display' );  return this.a; },
          rin    : ()=>{this._css.val_key(  this._css.spread( 'rin' ),    'display' );  return this.a; },
          inline : ()=>{this._css.val_key(  this._css.spread( 'inline' ), 'display' );  return this.a; },
          grid   : ()=>{this._css.val_key(  this._css.spread( 'grid' ),   'display' );  return this.a; },
          blk    : ()=>{this._css.val_key(  'block',   'display' );  return this.a; },
          no     : ()=>{this._css.val_key(  'none',    'display' );  return this.a; },

      },
      ani  : (val)=>{ this._css.val_key( val,  'animation'  );  return this.a; },
      anim : {
          name  : (val)=>{ this._css.val_key( val,  'animation-name'  );                return this.a; },
          dur   : (val)=>{ this._css.val_key( val,  'animation-duration'  );            return this.a; },
          tf    : (val)=>{ this._css.val_key( val,  'animation-timing-function'  );     return this.a; },
          dla   : (val)=>{ this._css.val_key( val,  'animation-delay'  );               return this.a; },
          ic    : (val)=>{ this._css.val_key( val,  'animation-iteration-count'  );     return this.a; },
          dir   : (val)=>{ this._css.val_key( val,  'animation-direction'  );           return this.a; },
          fm    : (val)=>{ this._css.val_key( val,   'animation-fill-mode' );           return this.a; },
          fmo   : {
              no    : (val)=>{ this._css.val_key( 'none',      'animation-fill-mode'  ); return this.a; },
              fw    : (val)=>{ this._css.val_key( 'forwards',  'animation-fill-mode'  ); return this.a; },
              bw    : (val)=>{ this._css.val_key( 'backwards', 'animation-fill-mode'  ); return this.a; },
              bo    : (val)=>{ this._css.val_key( 'both',      'animation-fill-mode'  ); return this.a; },


          },
          ps    : (val)=>{ this._css.val_key( val,   'animation-play-state'  );          return this.a; },
          pso   : {
              run   : (val)=>{ this._css.val_key( 'running',  'animation-play-state'  ); return this.a; },
              pau   : (val)=>{ this._css.val_key( 'paused',   'animation-play-state'  ); return this.a; },


          },


      },
      fnt  : {
          fml  :(val)=>{ this._css.val_key( val,  this._css.spread( 'fnt','fml'  ));    return this.a; },
          kern :(val)=>{ this._css.val_key( val,  this._css.spread( 'fnt','kern' ));    return this.a; },
          size :(val)=>{ this._css.val_key( val,  this._css.spread( 'fnt','size' ));    return this.a; },
          sdj  :(val)=>{ this._css.val_key( val,  this._css.spread( 'fnt','siz','adj'));return this.a; },  
          stc  :(val)=>{ this._css.val_key( val,  this._css.spread( 'fnt','stc'  ));    return this.a; }, 
          sty  :(val)=>{ this._css.val_key( val,  this._css.spread( 'fnt','sty'  ));    return this.a; },
          style :(val)=>{  return this.a; },
          var  :(val)=>{ this._css.val_key( val,  this._css.spread( 'fnt','var'  ));    return this.a; },
          wei  :(val)=>{ this._css.val_key( val,  this._css.spread( 'fnt','wei'  ));    return this.a; },


      },
      flx  : {
          bas  :(val)=>{ this._css.val_key(  val, this._css.spread( 'flx','bas'  ) );  return this.a; },
          dir  :{
              row   : ()=>{ this._css.val_key( this._css.spread( 'row' ), this._css.spread( 'flx','dir' ) );  return this.a; },
              col   : ()=>{ this._css.val_key( this._css.spread( 'col' ), this._css.spread( 'flx','dir' ) );  return this.a; },
              init  : ()=>{ this._css.val_key( this._css.spread( 'init'), this._css.spread( 'flx','dir' ) );  return this.a; },
              inh   : ()=>{ this._css.val_key( this._css.spread( 'inh' ), this._css.spread( 'flx','dir' ) );  return this.a; },
              rv    : ()=>{ this._css.val_key( this._css.spread( 'rrvs' ), this._css.spread( 'flx','dir' ) );  return this.a; },
              cv    : ()=>{ this._css.val_key( this._css.spread( 'crvs' ), this._css.spread( 'flx','dir' ) );  return this.a; },


          }, 
          shr  :(val)=>{ this._css.val_key( val, this._css.spread( 'flx','shr'  ) );  return this.a; },
          flow :(val)=>{ this._css.val_key( val, this._css.spread( 'flx','flow' ) );  return this.a; },
          grow :(val)=>{ this._css.val_key( val, this._css.spread( 'flx','grow' ) );  return this.a; },
          wrap  :{
              yes    : ()=>{ this._css.val_key( this._css.spread( 'wrap' ), this._css.spread( 'flx','wrap' ) );  return this.a; },
              no     : ()=>{ this._css.val_key( this._css.spread( 'nwr'  ), this._css.spread( 'flx','wrap' ) );  return this.a; },
              inh    : ()=>{ this._css.val_key( this._css.spread( 'inh'  ), this._css.spread( 'flx','wrap' ) );  return this.a; },
              init   : ()=>{ this._css.val_key( this._css.spread( 'init' ), this._css.spread( 'flx','wrap' ) );  return this.a; },
              wrvs   : ()=>{ this._css.val_key( this._css.spread( 'wrap','rvs' ), this._css.spread( 'flx','wrap' ) );  return this.a; },


          },
          //wrp  : this.a.flx.wrap,


      },
      box  : {
          size : {
              cont  : ()=>{ this._css.val_key( 'content-box',  'box-sizing' );    return this.a; },
              bord  : ()=>{ this._css.val_key( 'border-box',   'box-sizing' );    return this.a; },
              inh   : ()=>{ this._css.val_key( 'inherit',   'box-sizing' );    return this.a; },
          },
          shad  : (val)=>{ this._css.val_key( val,  'box-shadow' );    return this.a; },
         
      },
      jc   : {
          c    :()=>{ this._css.val_key( this._css.spread( 'ctr' ),          this._css.spread( 'jc' ));  return this.a; },
          fs   :()=>{ this._css.val_key( this._css.spread( 'flx','start' ),  this._css.spread( 'jc' ));  return this.a; },
          fe   :()=>{ this._css.val_key( this._css.spread( 'flx','end' ),    this._css.spread( 'jc' ));  return this.a; },
          sa   :()=>{ this._css.val_key( this._css.spread( 'spa','aro' ),    this._css.spread( 'jc' ));  return this.a; },
          sb   :()=>{ this._css.val_key( this._css.spread( 'spa','bet' ),    this._css.spread( 'jc' ));  return this.a; },
          init :()=>{ this._css.val_key( this._css.spread( 'init' ),         this._css.spread( 'jc' ));  return this.a; },
          inh  :()=>{ this._css.val_key( this._css.spread( 'inh' ),          this._css.spread( 'jc' ));  return this.a; },

      },
      ac   : {
          s    : ()=>{ this._css.val_key( this._css.spread( 'stc' ),          this._css.spread( 'ac' ));  return this.a; },
          c    : ()=>{ this._css.val_key( this._css.spread( 'ctr' ),          this._css.spread( 'ac' ));  return this.a; },
          fs   : ()=>{ this._css.val_key( this._css.spread( 'flx','start' ),  this._css.spread( 'ac' ));  return this.a; },
          fe   : ()=>{ this._css.val_key( this._css.spread( 'flx','end' ),    this._css.spread( 'ac' ));  return this.a; },
          sa   : ()=>{ this._css.val_key( this._css.spread( 'spa','aro' ),    this._css.spread( 'ac' ));  return this.a; },
          sb   : ()=>{ this._css.val_key( this._css.spread( 'spa','bet' ),    this._css.spread( 'ac' ));  return this.a; },
          init : ()=>{ this._css.val_key( this._css.spread( 'init' ),         this._css.spread( 'ac' ));  return this.a; },
          inh  : ()=>{ this._css.val_key( this._css.spread( 'inh' ),          this._css.spread( 'ac' ));  return this.a; },

      },
      ai   : {
          s    : ()=>{ this._css.val_key( this._css.spread( 'stc' ),          this._css.spread( 'ai' ));  return this.a; },
          c    : ()=>{ this._css.val_key( this._css.spread( 'ctr' ),          this._css.spread( 'ai' ));  return this.a; },
          fs   : ()=>{ this._css.val_key( this._css.spread( 'flx','start' ),  this._css.spread( 'ai' ));  return this.a; },
          fe   : ()=>{ this._css.val_key( this._css.spread( 'flx','end' ),    this._css.spread( 'ai' ));  return this.a; },
          sa   : ()=>{ this._css.val_key( this._css.spread( 'spa','aro' ),    this._css.spread( 'ai' ));  return this.a; },
          sb   : ()=>{ this._css.val_key( this._css.spread( 'spa','bet' ),    this._css.spread( 'ai' ));  return this.a; },
          init : ()=>{ this._css.val_key( this._css.spread( 'init' ),         this._css.spread( 'ai' ));  return this.a; },
          inh  : ()=>{ this._css.val_key( this._css.spread( 'inh' ),          this._css.spread( 'ai' ));  return this.a; },

      },
      as   : {
          auto : ()=>{ this._css.val_key( this._css.spread( 'aut' ),          this._css.spread( 'as' ));  return this.a; },
          s    : ()=>{ this._css.val_key( this._css.spread( 'stc' ),          this._css.spread( 'as' ));  return this.a; },
          c    : ()=>{ this._css.val_key( this._css.spread( 'ctr' ),          this._css.spread( 'as' ));  return this.a; },
          fs   : ()=>{ this._css.val_key( this._css.spread( 'flx','start' ),  this._css.spread( 'as' ));  return this.a; },
          fe   : ()=>{ this._css.val_key( this._css.spread( 'flx','end' ),    this._css.spread( 'as' ));  return this.a; },
          bl   : ()=>{ this._css.val_key( this._css.spread( 'bl' ),           this._css.spread( 'as' ));  return this.a; },
          init : ()=>{ this._css.val_key( this._css.spread( 'init' ),         this._css.spread( 'as' ));  return this.a; },
          inh  : ()=>{ this._css.val_key( this._css.spread( 'inh' ),          this._css.spread( 'as' ));  return this.a; },

      },
      
      line  : {
          hei  : (val)=>{    this._css.val_key(  val, 'line-height' );  return this.a; },
      


      },
      col  : {
          cnt   : {
              auto  :()=>{    this._css.val_key(  this._css.spread( 'auto' ), this._css.spread( 'col','cnt' ) );  return this.a; },
              init  :()=>{    this._css.val_key(  this._css.spread( 'init' ), this._css.spread( 'col','cnt' ) );  return this.a; },
              inh   :()=>{    this._css.val_key(  this._css.spread( 'inh' ),    this._css.spread( 'col','cnt' ) );  return this.a; },
              val   : ()=>{ this._css.val_key(  val, this._css.spread( 'col','cnt' ) );  return this.a; },
          },
          fill  : {
              bal  :()=>{    this._css.val_key(  this._css.spread( 'bal' ), this._css.spread( 'col','fill' ) );  return this.a; },
              init  :()=>{    this._css.val_key(  this._css.spread( 'init' ), this._css.spread( 'col' ) );  return this.a; },
              inh   :()=>{    this._css.val_key(  this._css.spread( 'inh' ),    this._css.spread( 'col' ) );  return this.a; },
              val   :(val)=>{ this._css.val_key(  val, this._css.spread( 'col' ) );  return this.a; },
              
          },


      },
      
      grid : {
          auto : {
              auto  : ()=>{ this._css.val_key( this._css.spread( 'auto' ),       this._css.spread( 'grid','auto' ) );  return this.a; },
              max   : ()=>{ this._css.val_key( this._css.spread( 'max','cont' ), this._css.spread( 'grid','auto' ) );  return this.a; },
              min   : ()=>{ this._css.val_key( this._css.spread( 'min','cont' ), this._css.spread( 'grid','auto' ) );  return this.a; },
              mm    : ()=>{ this._css.val_key( this._css.spread( 'minmax' ),     this._css.spread( 'grid','auto' ) );  return this.a; },
              fix   : ()=>{ this._css.val_key( this._css.spread( 'fix','cont' ), this._css.spread( 'grid','auto' ) );  return this.a; },
              val   : (val)=>{ this._css.val_key( val,                         this._css.spread( 'grid','auto' ) );  return this.a; },
          },
          col  : {
              start : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','col','start' ) );  return this.a; },
              end   : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','col','end' ) );    return this.a; },
              gap   : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','col','gap' ) );    return this.a; },
              val   : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','col' ) );          return this.a; },
          },
          row  : {
              start : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','row','start' ) );  return this.a; },
              end   : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','row','end' ) );    return this.a; },
              gap   : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','row','gap' ) );    return this.a; },
              val   : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','row' ) );          return this.a; },
          },
          temp : {
              areas : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','temp','areas' ) );  return this.a; },
              rows  : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','temp','rows' ) );    return this.a; },
              cols  : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','temp','cols' ) );    return this.a; },
              val   : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','temp' ) );          return this.a; },
          },
          area : {
              rs  : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','area','' ) );  return this.a; },
              re  : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','area','rows' ) );    return this.a; },
              cs  : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','area','cols' ) );    return this.a; },
              ce  : (val)=>{ this._css.val_key( val, this._css.spread( 'grid','area' ) );          return this.a; },


          },


      },
      
      bg   : (val)=>{ this._css.val_key( val,  this._css.spread( 'bg' ));  return this.a; },
      bgd  : {
          att  :(val)=>{ this._css.val_key( val,  this._css.spread( 'bg','att' ));  return this.a; },
          bld  :(val)=>{ this._css.val_key( val,  this._css.spread( 'bg','bld' ));  return this.a; },
          clip :(val)=>{ this._css.val_key( val,  this._css.spread( 'bg','clip'));  return this.a; },
          clr  :(val)=>{ this._css.val_key( val,  this._css.spread( 'bg','clr' ));  return this.a; },
          img  :(val)=>{ this._css.val_key( val,  this._css.spread( 'bg','img' ));  return this.a; },
          ori  :(val)=>{ this._css.val_key( val,  this._css.spread( 'bg','ori' ));  return this.a; },
          pos  :(val)=>{ this._css.val_key( val,  this._css.spread( 'bg','pos' ));  return this.a; },
          rep  :(val)=>{ this._css.val_key( val,  this._css.spread( 'bg','rep' ));  return this.a; },
          siz  :(val)=>{ this._css.val_key( val,  this._css.spread( 'bg','siz' ));  return this.a; },  
          tsp  : ()=>{ this._css.val_key( 'transparent',  'background' );  return this.a; },  
          ccl  : ()=>{ this._css.val_key( 'currentColor', 'background' );  return this.a; },  


      },
      
      bor  : (val)=>{ this._css.val_key( val,  this._css.spread( 'bor' ));  return this.a; },
      bord : {
          top : {
              clr : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','top','clr' ));  return this.a; },
              sty : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','top','sty' ));  return this.a; },
              wid : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','top','wid' ));  return this.a; },
              val : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','top' ));  return this.a; },
              rad : {
                  lef : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','top','lef','rad' ));  return this.a; },
                  rig : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','top','rig','rad' ));  return this.a; },
                  both : (val)=>{ this._css.val_key(val,'border-top-left-radius'); 
                                  this._css.val_key(val,'border-top-right-radius');return this.a; },


              },


          },
          bot : {
              clr : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','bot','clr' ));  return this.a; },
              sty : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','bot','sty' ));  return this.a; },
              wid : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','bot','wid' ));  return this.a; },
              rad : {
                  lef : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','bot','lef','rad' ));  return this.a; },
                  rig : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','bot','rig','rad' ));  return this.a; },
                  both : (val)=>{ this._css.val_key(val,'border-bottom-left-radius'); 
                                  this._css.val_key(val,'border-bottom-right-radius');return this.a; },
                 
                  


              },
              val : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','bot' ));  return this.a; },


          },
          lef : {
              clr : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','lef','clr' ));  return this.a; },
              sty : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','lef','sty' ));  return this.a; },
              wid : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','lef','wid' ));  return this.a; },
              val : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','lef'));  return this.a; },


          },
          rig : {
              clr : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','rig','clr' ));  return this.a; },
              sty : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','rig','sty' ));  return this.a; },
              wid : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','rig','wid' ));  return this.a; },
              val : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','rig' ));  return this.a; },


          },
          rad : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','rad' ));  return this.a; },
          ima : {
              os  : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','ima','os'  ));  return this.a; },
              rep : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','ima','sli' ));  return this.a; },
              sli : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','ima','rep' ));  return this.a; },
              wid : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','ima','wid' ));  return this.a; },
              src : (val)=>{this._css.val_key( val,  this._css.spread( 'bor','ima','src' ));  return this.a; },


          },
          clr  :(val)=>{ this._css.val_key( val,  this._css.spread( 'bor','clr' ));  return this.a; },  
          sty  :(val)=>{ this._css.val_key( val,  this._css.spread( 'bor','sty' ));  return this.a; },  
          wid  :(val)=>{ this._css.val_key( val,  this._css.spread( 'bor','wid' ));  return this.a; },  
          rdi  :(val)=>{ this._css.val_key( val,  this._css.spread( 'bor','rdi' ));  return this.a; },  
          spa  :(val)=>{ this._css.val_key( val,  this._css.spread( 'bor','spa' ));  return this.a; },  
          coll :(val)=>{ this._css.val_key( val,  this._css.spread( 'bor','coll'));  return this.a; },  
          t    :(val)=>{ this._css.val_key( val,  this._css.spread( 'bor','t' ));    return this.a; },  
          b    :(val)=>{ this._css.val_key( val,  this._css.spread( 'bor','b' ));    return this.a; },  
          l    :(val)=>{ this._css.val_key( val,  this._css.spread( 'bor','l' ));    return this.a; },  
          r    :(val)=>{ this._css.val_key( val,  this._css.spread( 'bor','r' ));    return this.a; },  
          lr   :(L,R=L)=>{ this._css.val_key( L,  'border-left');    
                           this._css.val_key( R,  'border-right');  return this.a; },  
          
          bt   :(b,t=b)=>{ this._css.val_key( b,  'border-bottom');    
                           this._css.val_key( t,  'border-top');  return this.a; },  
          


      },
      
      mar  : (val)=>{ this._css.val_key( val,  this._css.spread( 'mrg' ));  return this.a; },
      marg : {
          top :(val)=>{ this._css.val_key( val,  this._css.spread( 'mrg', 'top' ));  return this.a; },
          lef :(val)=>{ this._css.val_key( val,  this._css.spread( 'mrg', 'lef' ));  return this.a; },
          rig :(val)=>{ this._css.val_key( val,  this._css.spread( 'mrg', 'rig' ));  return this.a; },
          bot :(val)=>{ this._css.val_key( val,  this._css.spread( 'mrg', 'bot' ));  return this.a; },


      },
      max  : {
        w   : (w)=>{  this._css.val_key( w,'max-width' );  return this.a;},
        h   : (h)=>{  this._css.val_key( h,'max-height' );  return this.a;},
        wh   : (w,h=w)=>{  this._css.val_key( w,'max-width' ) ; 
                           this._css.val_key( h,'max-height' ) ; return this.a;},
      },
      min  : {
        w   : (w)=>{  this._css.val_key( w,'min-width' );  return this.a;},
        h   : (h)=>{  this._css.val_key( h,'min-height' );  return this.a;},
        wh   : (w,h=w)=>{  this._css.val_key( w,'min-width' ) ; 
                           this._css.val_key( h,'min-height' ) ; return this.a;},
      },
      mbm  : {
        nor   : ()=>{ this._css.val_key( 'normal',        'mix-blend-mode' ) ; return this.a;},
        muti  : ()=>{ this._css.val_key( 'multiply',      'mix-blend-mode' ) ; return this.a;},
        scr   : ()=>{ this._css.val_key( 'screen',        'mix-blend-mode' ) ; return this.a;},
        ol    : ()=>{ this._css.val_key( 'overlay',       'mix-blend-mode' ) ; return this.a;},
        dk    : ()=>{ this._css.val_key( 'darken',        'mix-blend-mode' ) ; return this.a;},
        lit   : ()=>{ this._css.val_key( 'lighten',       'mix-blend-mode' ) ; return this.a;},
        cd    : ()=>{ this._css.val_key( 'color-dodge',   'mix-blend-mode' ) ; return this.a;},
        cb    : ()=>{ this._css.val_key( 'color-burn',    'mix-blend-mode' ) ; return this.a;},
        diff  : ()=>{ this._css.val_key( 'difference',    'mix-blend-mode' ) ; return this.a;},
        ex    : ()=>{ this._css.val_key( 'exclusion',     'mix-blend-mode' ) ; return this.a;},
        hue   : ()=>{ this._css.val_key( 'hue',           'mix-blend-mode' ) ; return this.a;},
        satu  : ()=>{ this._css.val_key( 'saturation',    'mix-blend-mode' ) ; return this.a;},
        c     : ()=>{ this._css.val_key( 'color',         'mix-blend-mode' ) ; return this.a;},
        lumi  : ()=>{ this._css.val_key( 'luminosity',    'mix-blend-mode' ) ; return this.a;},
      },
      
      clr  : (val)=>{ this._css.val_key( val,  'color');    return this.a; },
      cont : (val)=>{ this._css.val_key( `'${val}'`,  'content' ); return this.a; },
     
      //imp  : (val)=>{ this._css.val_key( `(${val})`,  '@import');  return this.a; },
      opc  : (val)=>{ this._css.val_key( val,  'opacity');  return this.a; },
      ovf  : {
          vis   : (val)=>{ this._css.val_key( 'visible',  'overflow');  return this.a; },
          hid   : (val)=>{ this._css.val_key( 'hidden',   'overflow');  return this.a; },
          scl   : (val)=>{ this._css.val_key( 'scroll',   'overflow');  return this.a; },
          auto  : (val)=>{ this._css.val_key( 'auto',     'overflow');  return this.a; },
          clip  : (val)=>{ this._css.val_key( 'clip',     'overflow');  return this.a; },
      },  
      ovfl : {
          x : {
              vis   : (val)=>{ this._css.val_key( 'visible',  'overflow-x');  return this.a; },
              hid   : (val)=>{ this._css.val_key( 'hidden',   'overflow-x');  return this.a; },
              scl   : (val)=>{ this._css.val_key( 'scroll',   'overflow-x');  return this.a; },
              auto  : (val)=>{ this._css.val_key( 'auto',     'overflow-x');  return this.a; },
              clip  : (val)=>{ this._css.val_key( 'clip',     'overflow-x');  return this.a; },
          },
          y : {
              vis   : (val)=>{ this._css.val_key( 'visible',  'overflow-y');  return this.a; },
              hid   : (val)=>{ this._css.val_key( 'hidden',   'overflow-y');  return this.a; },
              scl   : (val)=>{ this._css.val_key( 'scroll',   'overflow-y');  return this.a; },
              auto  : (val)=>{ this._css.val_key( 'auto',     'overflow-y');  return this.a; },
              clip  : (val)=>{ this._css.val_key( 'clip',     'overflow-y');  return this.a; },
          },
      },
      pad  : (val)=>{ this._css.val_key( val,  'padding');  return this.a; },
      padd : {
          top :(val)=>{ this._css.val_key( val,  this._css.spread( 'pdi', 'top' ));  return this.a; },
          lef :(val)=>{ this._css.val_key( val,  this._css.spread( 'pdi', 'lef' ));  return this.a; },
          rig :(val)=>{ this._css.val_key( val,  this._css.spread( 'pdi', 'rig' ));  return this.a; },
          bot :(val)=>{ this._css.val_key( val,  this._css.spread( 'pdi', 'bot' ));  return this.a; },
          lr :(L,R=L)=>{ this._css.val_key( L,  'padding-left' );  
                        this._css.val_key( R,  'padding-right' );return this.a; },
          bt :(B,T=B)=>{ this._css.val_key( B,  'padding-bottom' );  
                        this._css.val_key( T,  'padding-top' );return this.a; },


      },
      pos  : {
          abs :()=>{ this._css.val_key( 'absolute', this._css.spread( 'pos' ));  return this.a; },
          rel :()=>{ this._css.val_key( 'relative', this._css.spread( 'pos' ));  return this.a; },
          fix :()=>{ this._css.val_key( 'fixed',    this._css.spread( 'pos' ));  return this.a; },
          stk :()=>{ this._css.val_key( 'sticky',   this._css.spread( 'pos' ));  return this.a; },
          sti :()=>{ this._css.val_key( 'static',   this._css.spread( 'pos' ));  return this.a; },

      },
      txt  : {
          ali : {
              s     : ()=>{ this._css.val_key( 'start',  'text-align');  return this.a; },
              e     : ()=>{ this._css.val_key( 'end',    'text-align');  return this.a; },
              c     : ()=>{ this._css.val_key( 'center', 'text-align');  return this.a; },
              l     : ()=>{ this._css.val_key( 'left',   'text-align');  return this.a; },
              r     : ()=>{ this._css.val_key( 'right',  'text-align');  return this.a; },
          },
          ovfl : {
            clip     : ()=>{ this._css.val_key( 'clip',     'text-overflow');  return this.a; },
            elli     : ()=>{ this._css.val_key( 'ellipsis', 'text-overflow');  return this.a; },
             
          },

      },
      tsf  : (val)=>{ this._css.val_key( val,  'transform');  return this.a; },
      tsl  : (val)=>{ this._css.val_key( val,  'translate');  return this.a; },
      tsi  : (val)=>{ this._css.val_key( val,  'transition');  return this.a; },
      trsf : {
          ori  : (val)=>{ this._css.val_key( val,  'transform-origin');  return this.a; },
          sty  : (val)=>{ this._css.val_key( val,  'transform-style');   return this.a; },
      },
      trsi : {
          time  : (val)=>{ this._css.val_key( val,  'transition-timing-function');  return this.a; },
          dla   : (val)=>{ this._css.val_key( val,  'transition-delay');            return this.a; },
          dua   : (val)=>{ this._css.val_key( val,  'transition-duration');         return this.a; },
          ppt   : (val)=>{ this._css.val_key( val,  'transition-property');         return this.a; },


      },
      
      //float：none | left | right
      
      flo  : {
          no    : ()=>{this._css.val_key( 'none',     'float');  return this.a; },
          lef   : ()=>{this._css.val_key( 'left',     'float');  return this.a; },
          rig   : ()=>{this._css.val_key( 'right',    'float');  return this.a; },
      },
      vtl  : {
        ali : {
          bl    : ()=>{this._css.val_key( 'baseline',     'vertical-align');  return this.a; },
          sub   : ()=>{this._css.val_key( 'sub',          'vertical-align');  return this.a; },
          sup   : ()=>{this._css.val_key( 'super',        'vertical-align');  return this.a; },
          top   : ()=>{this._css.val_key( 'top',          'vertical-align');  return this.a; },
          txt   : ()=>{this._css.val_key( 'text-top',     'vertical-align');  return this.a; },
          mid   : ()=>{this._css.val_key( 'middle',       'vertical-align');  return this.a; },
          bot   : ()=>{this._css.val_key( 'bottom',       'vertical-align');  return this.a; },
          txtb  : ()=>{this._css.val_key( 'text-bottom',  'vertical-align');  return this.a; },
          val   : (val)=>{this._css.val_key( val,         'vertical-align');  return this.a; },
        },
      },
      //align： | sub | super | top | text-top | middle | bottom | text-bottom | <percentage> | <length>
      vis  : {
        yes : ()=>{this._css.val_key( 'visible',  'visibility');  return this.a; },
        no  : ()=>{this._css.val_key( 'hidden',  'visibility');  return this.a; },
        vis : ()=>{this._css.val_key( 'visible',  'visibility');  return this.a; },
        hid  : ()=>{this._css.val_key( 'hidden',  'visibility');  return this.a; },
      },
      border : (val)=>{ return this.a.bor(val)},
      wich   : (val)=>{ this._css.val_key( val,  'will-change');  return this.a; },
      zidx   : (val)=>{ this._css.val_key( val,  'z-index');  return this.a; },

      ff : ()=>{ return this.f; },
      ds : ()=>{ return this; },
  }
 
  //#fast
  f = {
    abs : ()=>{ this.a.pos.abs();       return  this.f ; },
    rel : ()=>{ this.a.pos.rel();       return  this.f ; },
    fix : ()=>{ this.a.pos.fix();       return  this.f ; },
    blk : ()=>{ this.a.dsp.blk();       return  this.f ; },
    tac : ()=>{ this.a.txt.ali.c();     return  this.f ; },
    tar : ()=>{ this.a.txt.ali.r();     return  this.f ; },
    tal : ()=>{ this.a.txt.ali.l();     return  this.f ; },
    tsp : ()=>{ this.a.bgd.tsp();       return  this.f ; },
    fs  : (val)=>{ this.a.fnt.size(val);return  this.f ; },
    flx : {
        flx  : ()=>{ this.a.dsp.flx();       return  this.f.flx ;},
        jcc  : ()=>{ this.a.jc.c();          return  this.f.flx ;},
        jcfs : ()=>{ this.a.jc.fs();         return  this.f.flx ;},
        jcfe : ()=>{ this.a.jc.fe();         return  this.f.flx ;},
        jcsa : ()=>{ this.a.jc.sa();         return  this.f.flx ;},
        jcsb : ()=>{ this.a.jc.sb();         return  this.f.flx ;},
        jcii : ()=>{ this.a.jc.init();       return  this.f.flx ;},
        jcih : ()=>{ this.a.jc.inh();        return  this.f.flx ;},
        aic  : ()=>{ this.a.ai.c();          return  this.f.flx ;},
        aifs : ()=>{ this.a.ai.fs();         return  this.f.flx ;},
        aife : ()=>{ this.a.ai.fe();         return  this.f.flx ;},
        aisa : ()=>{ this.a.ai.sa();         return  this.f.flx ;},
        aisb : ()=>{ this.a.ai.sb();         return  this.f.flx ;},
        aiii : ()=>{ this.a.ai.init();       return  this.f.flx ;},
        aiih : ()=>{ this.a.ai.inh();        return  this.f.flx ;},
        fdc  : ()=>{ this.a.flx.dir.col();   return  this.f.flx ;},
        fdcv : ()=>{ this.a.flx.dir.cv();   return  this.f.flx ;},
        fdr  : ()=>{ this.a.flx.dir.row();   return  this.f.flx ;},
        fdrv : ()=>{ this.a.flx.dir.rv();   return  this.f.flx ;},
        wry  : ()=>{ this.a.flx.wrap.yes();  return  this.f.flx ;},
        wrn  : ()=>{ this.a.flx.wrap.no();   return  this.f.flx ;},
        wrii : ()=>{ this.a.flx.wrap.init(); return  this.f.flx ;},
        wrih : ()=>{ this.a.flx.wrap.inh();  return  this.f.flx ;},
        aa   : ()=>{ return  this.a ; },
        ff   : ()=>{ return  this.f ; },
        ds   : ()=>{ return  this ; },
    },
    aa  : ()=>{ return  this.a ; },
    ds  : ()=>{ return  this ; },
  }
  
 /*
  number keyboard
  
  col
  7    8    9
  0    0    0
  4    5    6
  0    0    0
  1    2    3
  
  row
  7  0  8  0  9
  4  0  5  0  6
  1  0  2  0  3
  
 */
  //#kb
  kb = {
      col   : {
            //1
            es   : ()=>{ this.f.flx.flx().fdc().jcfe().aifs();    return  this ;},
            //2
            ec   : ()=>{ this.f.flx.flx().fdc().jcfe().aic();     return  this ;},
            //3
            ee   : ()=>{ this.f.flx.flx().fdc().jcfe().aife();    return  this ;},
            //4
            cs   : ()=>{ this.f.flx.flx().fdc().jcc().aifs();     return  this ;},
            //5
            cc   : ()=>{ this.f.flx.flx().fdc().jcc().aic();      return  this ;},
            //6
            ce   : ()=>{ this.f.flx.flx().fdc().jcc().aife();     return  this ;},
            //7
            ss   : ()=>{ this.f.flx.flx().fdc().jcfs().aifs();    return  this ;},
            //8
            sc   : ()=>{ this.f.flx.flx().fdc().jcfs().aic();     return  this ;},
            //9
            se   : ()=>{ this.f.flx.flx().fdc().jcfs().aife();    return  this ;},
            //71
            sbs : ()=>{ this.f.flx.flx().fdc().jcsb().aifs();     return  this ;},
            //82
            sbc  : ()=>{ this.f.flx.flx().fdc().jcsb().aic();     return  this ;},
            //93
            sbe : ()=>{ this.f.flx.flx().fdc().jcsb().aife();     return  this ;},
            //7040
            sas : ()=>{ this.f.flx.flx().fdc().jcsa().aifs();     return  this ;},
            //8050
            sac  : ()=>{ this.f.flx.flx().fdc().jcsa().aic();     return  this ;},
            //9060
            sae : ()=>{ this.f.flx.flx().fdc().jcsa().aife();     return  this ;},
            
            p   : (n)=>{
                if(n ==   1 ){ return  this.kb.col.es() ;   }else 
                if(n ==   2 ){ return  this.kb.col.ec() ;   }else
                if(n ==   3 ){ return  this.kb.col.ee() ;   }else 
                if(n ==   4 ){ return  this.kb.col.cs() ;   }else
                if(n ==   5 ){ return  this.kb.col.cc() ;   }else 
                if(n ==   6 ){ return  this.kb.col.ce() ;   }else
                if(n ==   7 ){ return  this.kb.col.ss() ;   }else 
                if(n ==   8 ){ return  this.kb.col.sc() ;   }else
                if(n ==   9 ){ return  this.kb.col.se() ;   }else
                if(n ==  71 ){ return  this.kb.col.sbs() ;  }else
                if(n ==  82 ){ return  this.kb.col.sbc() ;  }else
                if(n ==  93 ){ return  this.kb.col.sbe() ;  }else
                if(n ==  17 ){ return  this.kb.cv.sbs() ;   }else
                if(n ==  28 ){ return  this.kb.cv.sbc() ;   }else
                if(n ==  39 ){ return  this.kb.cv.sbe() ;   }else
                if(n == 7040){ return  this.kb.col.sas() ;  }else
                if(n == 8050){ return  this.kb.col.sac() ;  }else
                if(n == 9060){ return  this.kb.col.sae() ;  }else
                if(n == 1040){ return  this.kb.cv.sas() ;   }else
                if(n == 2050){ return  this.kb.cv.sac() ;   }else
                if(n == 3060){ return  this.kb.cv.sae() ;   }
                return  this ;
            },
      },
      cv    : {
            //1
            ss   : ()=>{ this.f.flx.flx().fdcv().jcfs().aifs();    return  this ;},
            //2
            sc   : ()=>{ this.f.flx.flx().fdcv().jcfs().aic();     return  this ;},
            //3
            se   : ()=>{ this.f.flx.flx().fdcv().jcfs().aife();    return  this ;},
            //4
            cs   : ()=>{ this.f.flx.flx().fdcv().jcc().aifs();     return  this ;},
            //5
            cc   : ()=>{ this.f.flx.flx().fdcv().jcc().aic();      return  this ;},
            //6
            ce   : ()=>{ this.f.flx.flx().fdcv().jcc().aife();     return  this ;},
            //7
            es   : ()=>{ this.f.flx.flx().fdcv().jcfe().aifs();    return  this ;},
            //8
            ec   : ()=>{ this.f.flx.flx().fdcv().jcfe().aic();     return  this ;},
            //9
            ee   : ()=>{ this.f.flx.flx().fdcv().jcfe().aife();    return  this ;},
            //17
            sbs : ()=>{ this.f.flx.flx().fdcv().jcsb().aifs();     return  this ;},
            //28
            sbc  : ()=>{ this.f.flx.flx().fdcv().jcsb().aic();     return  this ;},
            //39
            sbe : ()=>{ this.f.flx.flx().fdcv().jcsb().aife();     return  this ;},
            //7040
            sas : ()=>{ this.f.flx.flx().fdcv().jcsa().aifs();     return  this ;},
            //8050
            sac  : ()=>{ this.f.flx.flx().fdcv().jcsa().aic();     return  this ;},
            //9060
            sae : ()=>{ this.f.flx.flx().fdcv().jcsa().aife();     return  this ;},
            
            
            p   : (n)=>{
                if(n ==   1 ){ return  this.kb.cv.ss() ;   }else 
                if(n ==   2 ){ return  this.kb.cv.sc() ;   }else
                if(n ==   3 ){ return  this.kb.cv.se() ;   }else 
                if(n ==   4 ){ return  this.kb.cv.cs() ;   }else
                if(n ==   5 ){ return  this.kb.cv.cc() ;   }else 
                if(n ==   6 ){ return  this.kb.cv.ce() ;   }else
                if(n ==   7 ){ return  this.kb.cv.es() ;   }else 
                if(n ==   8 ){ return  this.kb.cv.ec() ;   }else
                if(n ==   9 ){ return  this.kb.cv.ee() ;   }else
                if(n ==  17 ){ return  this.kb.cv.sbs() ; }else
                if(n ==  28 ){ return  this.kb.cv.sbc() ;  }else
                if(n ==  39 ){ return  this.kb.cv.sbe() ; }else
                if(n == 1040){ return  this.kb.cv.sas() ; }else
                if(n == 2050){ return  this.kb.cv.sac() ; }else
                if(n == 3060){ return  this.kb.cv.sae() ; }
                if(n ==  71 ){ return  this.kb.col.sbs() ; }else
                if(n ==  82 ){ return  this.kb.col.sbc() ;  }else
                if(n ==  93 ){ return  this.kb.col.sbe() ; }else
                if(n == 7040){ return  this.kb.col.sas() ; }else
                if(n == 8050){ return  this.kb.col.sac() ; }else
                if(n == 9060){ return  this.kb.col.sae() ; }
                return  this ;
            },
      },
      row   : {
            //1
            se : ()=>{ this.f.flx.flx().fdr().jcfs().aife();      return  this ;},
            //2
            ce : ()=>{ this.f.flx.flx().fdr().jcc().aife();    return  this ;},
            //3
            ee : ()=>{ this.f.flx.flx().fdr().jcfe().aife();    return  this ;},
            //4
            sc : ()=>{ this.f.flx.flx().fdr().jcfs().aic();    return  this ;},
            //5
            cc : ()=>{ this.f.flx.flx().fdr().jcc().aic();    return  this ;},
            //6
            ec : ()=>{ this.f.flx.flx().fdr().jcfe().aic();     return  this ;},
            //7
            ss : ()=>{ this.f.flx.flx().fdr().jcfs().aifs();     return  this ;},
            //8
            cs : ()=>{ this.f.flx.flx().fdr().jcc().aifs();     return  this ;},
            //9
            es : ()=>{ this.f.flx.flx().fdr().jcfe().aifs();     return  this ;},
            //13
            sbe : ()=>{ this.f.flx.flx().fdr().jcsb().aife();     return  this ;},
            //46
            sbc  : ()=>{ this.f.flx.flx().fdr().jcsb().aic();     return  this ;},
            //79
            sbs : ()=>{ this.f.flx.flx().fdr().jcsb().aifs();     return  this ;},
            //1020
            sae : ()=>{ this.f.flx.flx().fdr().jcsa().aife();     return  this ;},
            //4050
            sac  : ()=>{ this.f.flx.flx().fdr().jcsa().aic();     return  this ;},
            //7080
            sas : ()=>{ this.f.flx.flx().fdr().jcsa().aifs();     return  this ;},
            
            p   : (n)=>{
                if(n ==   1 ){ return  this.kb.row.se() ; }else 
                if(n ==   2 ){ return  this.kb.row.ce() ; }else
                if(n ==   3 ){ return  this.kb.row.ee() ; }else 
                if(n ==   4 ){ return  this.kb.row.sc() ; }else
                if(n ==   5 ){ return  this.kb.row.cc() ; }else 
                if(n ==   6 ){ return  this.kb.row.ec() ; }else
                if(n ==   7 ){ return  this.kb.row.ss() ; }else 
                if(n ==   8 ){ return  this.kb.row.cs() ; }else
                if(n ==   9 ){ return  this.kb.row.es() ; }else
                if(n ==  13 ){ return  this.kb.row.sbe() ; }else
                if(n ==  46 ){ return  this.kb.row.sbc() ; }else
                if(n ==  79 ){ return  this.kb.row.sbs() ; }else
                if(n == 1020){ return  this.kb.row.sae() ; }else
                if(n == 4050){ return  this.kb.row.sac() ; }else
                if(n == 7080){ return  this.kb.row.sas() ; }else
                if(n ==  31 ){ return  this.kb.rv.sbe() ; }else
                if(n ==  64 ){ return  this.kb.rv.sbc() ; }else
                if(n ==  97 ){ return  this.kb.rv.sbs() ; }else
                if(n == 3020){ return  this.kb.rv.sae() ; }else
                if(n == 6050){ return  this.kb.rv.sac() ; }else
                if(n == 9080){ return  this.kb.rv.sas() ; }
                return  this ;
            }
      },
      rv    : {
            //1
            ee : ()=>{ this.f.flx.flx().fdrv().jcfe().aife();      return  this ;},
            //2
            ce : ()=>{ this.f.flx.flx().fdrv().jcc().aife();    return  this ;},
            //3
            se : ()=>{ this.f.flx.flx().fdrv().jcfs().aife();    return  this ;},
            //4
            ec : ()=>{ this.f.flx.flx().fdrv().jcfe().aic();    return  this ;},
            //5
            cc : ()=>{ this.f.flx.flx().fdrv().jcc().aic();    return  this ;},
            //6
            sc : ()=>{ this.f.flx.flx().fdrv().jcfs().aic();     return  this ;},
            //7
            es : ()=>{ this.f.flx.flx().fdrv().jcfe().aifs();     return  this ;},
            //8
            cs : ()=>{ this.f.flx.flx().fdrv().jcc().aifs();     return  this ;},
            //9
            ss : ()=>{ this.f.flx.flx().fdrv().jcfs().aifs();     return  this ;},
            //31
            sbe : ()=>{ this.f.flx.flx().fdrv().jcsb().aife();     return  this ;},
            //64
            sbc  : ()=>{ this.f.flx.flx().fdrv().jcsb().aic();     return  this ;},
            //97
            sbs : ()=>{ this.f.flx.flx().fdrv().jcsb().aifs();     return  this ;},
            //3020
            sae : ()=>{ this.f.flx.flx().fdrv().jcsa().aife();     return  this ;},
            //6050
            sac  : ()=>{ this.f.flx.flx().fdrv().jcsa().aic();     return  this ;},
            //9080
            sas : ()=>{ this.f.flx.flx().fdrv().jcsa().aifs();     return  this ;},
            
            p   : (n)=>{
                if(n ==   1 ){ return  this.kb.rv.ee() ; }else 
                if(n ==   2 ){ return  this.kb.rv.ce() ; }else
                if(n ==   3 ){ return  this.kb.rv.se() ; }else 
                if(n ==   4 ){ return  this.kb.rv.ec() ; }else
                if(n ==   5 ){ return  this.kb.rv.cc() ; }else 
                if(n ==   6 ){ return  this.kb.rv.sc() ; }else
                if(n ==   7 ){ return  this.kb.rv.es() ; }else 
                if(n ==   8 ){ return  this.kb.rv.cs() ; }else
                if(n ==   9 ){ return  this.kb.rv.ss() ; }else
                if(n ==  31 ){ return  this.kb.rv.sbe() ; }else
                if(n ==  64 ){ return  this.kb.rv.sbc() ; }else
                if(n ==  97 ){ return  this.kb.rv.sbs() ; }else
                if(n == 3020){ return  this.kb.rv.sae() ; }else
                if(n == 6050){ return  this.kb.rv.sac() ; }else
                if(n == 9080){ return  this.kb.rv.sas() ; }else
                if(n ==  13 ){ return  this.kb.row.sbe() ; }else
                if(n ==  46 ){ return  this.kb.row.sbc() ; }else
                if(n ==  79 ){ return  this.kb.row.sbs() ; }else
                if(n == 1020){ return  this.kb.row.p(3020) ; }else
                if(n == 4050){ return  this.kb.row.sac() ; }else
                if(n == 7080){ return  this.kb.row.p(9080) ; }
                
                return  this ;
            }
      },
      ccc   : ()=>{ return this.kb.col.cc() },
      rcc   : ()=>{ return this.kb.row.cc() },
      all   : ()=>{
          if(Doc.has(`style[class*='FlexAll']`))return this;
          let col = [1,2,3,4,5,6,7,8,9,17,71,28,82,39,93,1040,7040,2050,8050,3060,9060];
          let row = [1,2,3,4,5,6,7,8,9,13,31,46,64,79,97,1020,3020,4050,6050,7080,9080];
          let all = [row,col];
          let ppt = ['row','col'];
          let cs = new Css();
              cs.style(['Ajs','FlexAll']);
          for(let a = 0; a < all.length; a++){
            let arr = all[a];
            arr.forEach((num)=>{
              cs.slt(`.flex-${ppt[a]}-${num}`);
              let obj = Reflect.get(cs.flex,ppt[a]);
                        Reflect.get(obj,'p')(num);
              
            })
          }
          cs.ok();
      },
      ds   : ()=>{ return  this ; },
  }
  
  //#flex
  flex = this.kb;
  
  ds = ()=>{
      return this;
  }
  
  zz(key,val){
     this._css.val_key(val,`--${key}`);
     return this;
  }
  
  //define,--varible
  df(...args){
    return this.zz(...args);
  }
  
  //#time
  t = {
      infi  : 'infinite',
      line  : 'linear',
      ez    : 'easy',
      ei    : 'easy-in',
      eo    : 'easy-out',
      eio   : 'easy-in-out',
      ss    : 'step-start',
      se    : 'step-end',
  }

  
  //function
  fn = {
      tsl   : (val)=>{ return `translate(${val})`},
      tslx  : (val)=>{ return `translatex(${val})`},
      tsly  : (val)=>{ return `translatey(${val})`},
      tslz  : (val)=>{ return `translatez(${val})`},
      tsl3d : (val)=>{ return `translate3d(${val})`},
      tsf   : (val)=>{ return `transform(${val})`},
      tsi   : (val)=>{ return `transition(${val})`},
      mat   : (val)=>{ return `matrix(${val})`},
      mat3d : (val)=>{ return `matrix3d(${val})`},
      rot   : (val)=>{ return `rotate(${val})`},
      rotx  : (val)=>{ return `rotatex(${val})`},
      roty  : (val)=>{ return `rotatey(${val})`},
      rotz  : (val)=>{ return `rotatez(${val})`},
      rot3d : (val)=>{ return `rotate3d(${val})`},
      sca   : (val)=>{ return `scale(${val})`},
      scax  : (val)=>{ return `scalex(${val})`},
      scay  : (val)=>{ return `scaley(${val})`},
      scaz  : (val)=>{ return `scalez(${val})`},
      sca3d : (val)=>{ return `scale3d(${val})`},
      ske   : (val)=>{ return `skew(${val})`},
      skex  : (val)=>{ return `skewx(${val})`},
      skey  : (val)=>{ return `skewy(${val})`},
      pep   : (val)=>{ return `perspective(${val})`},
      svg   : (val)=>{ return `svg(${val})`},
      url   : (val)=>{ return `url('${val}')`},
      fmt   : (val)=>{ return `format('${val}')`},
      'var' : (val)=>{ return `var(${val})`},
      ligr  : (...args)=>{ return `linear-gradient(${[...args].join(',')})`},
      ccr   : ()=>{ return `currentColor()`},
      st    : (a,b)=>{ return `steps(${a},${b})`; },
      cb    : (a,b,c,d)=>{ return `cubic-bezier(${a},${b},${c},${d})`; },
  }
  
  
  /*
    param :
            i     : integer    : 0 ~ 15 (div=16)
                                 0 ~ 31 (div= 8)
                                 0 ~  7 (div=32)
            opc   : opacity    : 0 ~  1
            div   : division   : 8,16,32
            color : color name : 'red','yellow','blue','green','fuchsia','aqua','white'
            n     : 0 ~ 6
    usage : 
            let cs = new Css();
            let a  = cs.rgba.red(1);
            let b  = cs.rgba.get('red',1);
            let c  = cs.rgba.arr(0,1);
            //a,b,c get same result : "rgba(  239,     0,      0,    1 )"
  */
  //#rgba
  rgba = {
    data    : null,
    red     : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; this.rgba.data = Array.of(x,0,0,opc); return `rgba(  ${x},     0,      0,  ${opc} )` ;},
    yellow  : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; this.rgba.data = Array.of(x,x,0,opc); return `rgba(  ${x},  ${x},      0,  ${opc} )` ;},
    blue    : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; this.rgba.data = Array.of(0,0,x,opc); return `rgba(     0,     0,   ${x},  ${opc} )` ;},
    green   : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; this.rgba.data = Array.of(0,x,0,opc); return `rgba(     0,  ${x},      0,  ${opc} )` ;},
    fuchsia : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; this.rgba.data = Array.of(x,0,x,opc); return `rgba(  ${x},     0,   ${x},  ${opc} )` ;},
    aqua    : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; this.rgba.data = Array.of(0,x,x,opc); return `rgba(     0,  ${x},   ${x},  ${opc} )` ;},
    white   : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; this.rgba.data = Array.of(x,x,x,opc); return `rgba(  ${x},  ${x},   ${x},  ${opc} )` ;},
    rgb     : ( r, g, b )=>{ return `rgb(  ${r},  ${g},  ${b}  )` ;},
    get     : (color, i, opc=1, div=16 )=>{
                return Reflect.get(this.rgba,color)(i,opc,div);
              },
    arr     : (n, i, opc=1, div=16)=>{
                let arr = ['red','yellow','blue','green','fuchsia','aqua','white'];
                return this.rgba.get(arr[n],i,opc,div);
              },
    getArray  : (color, i, opc=1, div=16 )=>{
                Reflect.get(this.rgba,color)(i,opc,div);
                return this.rgba.data;
              },
  }
  
  rgbToHsl = (r, g, b) => {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    h = Math.floor(parseFloat( h*360 ).toFixed(2));
    s = parseFloat( s*100 ).toFixed(0);
    l = parseFloat( l*100 ).toFixed(0);
    return [h, s, l];
}
  
  /*
    usage:
    let cs = new Css();
    let hsl = new cs.hsl(0,50,50);
    let str1 = hsl.out(1);      //str1: hsl( 12,50,50);
    let str2 = hsl.out(1,2);    //str2: hsl( 12,70,50);
    let str3 = hsl.out(10,2,3); //str3: hsl(120,70,80);
  
  */
  hsl = class{
    
    constructor(h=0,s=10,l=10){
        this.dat = {
            hsl  : [h,s,l],
            hmax : 120,
            div : [12,10,10],
            inc : [12,10,10],
            mod : 'inc',
        }
    }
    
    h = (val)=>{this.dat.hsl[0]=val;return this;}
    s = (val)=>{this.dat.hsl[1]=val;return this;}
    l = (val)=>{this.dat.hsl[2]=val;return this;}
    
    hmax = (hmax)=>{
        return this._hsl.setDat('hmax',hmax);
    }
    
    
    div = (n1,n2,n3)=>{
        return this._hsl.setDat('div',[n1,n2,n3]);
    }
    
    inc = (n1,n2,n3)=>{
        return this._hsl.setDat('inc',[n1,n2,n3]);
    }
    
    mod = (mod)=>{
        return this._hsl.setDat('mod',mod);
    }
    
    step =  (...args)=>{
      
        let i = -1;
        if(this.dat.mod == 'div'){
            if(this.dat.hmax <= this.dat.h){
                this.dat.hmax = this.dat.h + 120;
            }
        }
        let d          = this.dat;
        let mod        = d.mod;
        let hsl        = [360, d.hsl[1], d.hsl[2]];
        let [hh,ss,ll] = [...hsl];
        for(let a of args){
            i++;
            if(typeof(a) !== 'number'){
                alert('3486:input must be number');
                return this;
            }
            if( mod == 'inc'){
                hsl[i] = d.hsl[i]+d.inc[i]*a;
            }
        }
        hh = hsl[0].toString().padStart(3,' ');
        ss = hsl[1].toString().padStart(3,' ');
        ll = hsl[2].toString().padStart(3,' ');
        return `hsl( ${hh}, ${ss}%, ${ll}% )`;
    }
    
    _hsl = {
        setDat : (k,v)=>{
            Reflect.set(this.dat,k,v);
            return this;
        }, 
        fout : (...args)=>{
            let [a,b,c,hh,ss,ll]=[0,0,0,0,0,0];
            if(Array.isArray(args[0])){
                a = args[0][0];
                b = args[0][1];
                c = args[0][2];
            }else{
                a = args[0];
                b = args[1];
                c = args[2];
            }
            hh = a.toString().padStart(3,' ');
            ss = b.toString().padStart(3,' ');
            ll = c.toString().padStart(3,' ');
            return `hsl( ${hh}, ${ss}, ${ll} )`;
        }
    }

  }
  
  /*
  color = {
    _dat    : [],
    _set    : (arr)=>{ this.color._dat = [...arr] ; return this.color;},
    _get    : ()=>{},
    red     : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; return this.color._set(  x,  0,  0,  opc ) ;},
    yellow  : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; return this.color._set(  x,  x,  0,  opc ) ;},
    blue    : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; return this.color._set(  0,  0,  x,  opc ) ;},
    green   : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; return this.color._set(  0,  x,  0,  opc ) ;},
    fuchsia : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; return this.color._set(  x,  0,  x,  opc ) ;},
    aqua    : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; return this.color._set(  0,  x,  x,  opc ) ;},
    white   : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; return this.color._set(  x,  x,  x,  opc ) ;},
    rgb     : ()=>{ let [r,g,b,opc] = [...this.color._dat]; return  `rgb(  ${r},  ${g},  ${b}  )` ;},
    rgba    : ()=>{ let [r,g,b,opc] = [...this.color._dat]; return `rgba(  ${r},  ${g},  ${b},  ${opc} )` ;},
    get     : (color, i, opc=1, div=16 )=>{
                return Reflect.get(this.rgba,color)(i,opc,div);
              },
    arr     : (n, i, opc=1, div=16)=>{
                let arr = ['red','yellow','blue','green','fuchsia','aqua','white'];
                return this.color.get(arr[n],i,opc,div);
              },
  }
  */
  
  //#_css
  _css = {
    //##abbr
    abbr      : {
              t    : 'top',
              b    : 'bottom',
              l    : 'left',
              r    : 'right',
              w    : 'width',
              h    : 'height',
              m    : 'margin',
              p    : 'padding',
              //##a
              abs  : 'absolute',
              ac   : 'align-content',
              ai   : 'align-items',
              as   : 'align-self',
              ali  : 'align',
              alg  : 'align',
              adj  : 'adjust',
              ani  : 'animation',
              aro  : 'around',
              att  : 'attachment',
              aut  : 'auto',
              //##b
              
              bas  : 'basis',
              bal  : 'balance',
              bdr  : 'border',
              beha : 'behavior',
              bet  : 'between',
              bf   : 'backface',
              bg   : 'background',
              bgd  : 'background',
              bl   : 'baseline',
              bld  : 'blend',
              blk  : 'block',
              bot  : 'bottom',
              bor  : 'border',
              borr : 'border-radius',
              btm  : 'bottom',
              //##c
              cap  : 'caption',
              chr  : 'character',
              col  : 'column',
              cols : 'columns',
              coll : 'collapse',
              ctr  : 'center',
              crvs : 'column-reverse',
              clr  : 'color',
              cont : 'content',
              cnt  : 'count',
              cnr  : 'counter',
              //##d
              dla  : 'delay',
              dec  : 'decoration',
              dir  : 'direction',
              dsp  : 'display',
              dur  : 'duration',
              //##e
              evt  : 'events',
              
              //##f
              fix  : 'fixed',
              flx  : 'flex',
              flxb : 'flexbox',
              fml  : 'family',
              fnc  : 'function',
              fnt  : 'font',
              foo  : 'footer',
              ftr  : 'footer',
              fs   : 'font-size',
              fun  : 'function',
              //##g
              grp  : 'group',
              //##h
              hang : 'hanging',
              hei  : 'height',
              hea  : 'header',
              //##i
              idx  : 'index',
              init : 'initial',
              inh  : 'inherit',
              inl  : 'inline',
              inr  : 'inter',
              ima  : 'image',
              img  : 'image',
              inc  : 'increment',
              iter : 'iteration',
              
              //##j
              jc   : 'justify-content',
              jst  : 'justify',
              jus  : 'justify',
              
              //##k
              kf   : '@keyframes',
              kern : 'kerning',
              //##l
              lef  : 'left',
              lis  : 'list',
              //##m
              mrg  : 'margin',
              mtx  : 'matrix',
              //##n
              non  : 'none',
              nwr  : 'nowrap',
              
              //##o
              obj  : 'object',
              ol   : 'outline',
              os   : 'outset',
              ori  : 'origin',
              //##p
              pad  : 'padding',
              pdi  : 'padding',
              pepe : 'perspective',
              ppt  : 'property',
              ptr  : 'pointer',
              pos  : 'position',
              //##r
              r    : 'border-radius',
              rad  : 'radius',
              rdi  : 'radius',
              rep  : 'repeat',
              rpt  : 'repeat',
              rel  : 'relative',
              res  : 'reset',
              rig  : 'right',
              rin  : 'run-in',
              rot  : 'rotate',
              rrvs : 'row-reverse',
              rtx  : 'rotatex',
              rty  : 'rotatey',
              rtz  : 'rotatez',
              rvs  : 'reverse',
              //##s
              sca  : 'scale',
              scl  : 'scroll',
              siz  : 'size',
              shr  : 'shrink',
              sizi : 'sizing',
              sli  : 'slice',
              spg  : 'spacing',
              spa  : 'space',
              sta  : 'state',
              sti  : 'static',
              stk  : 'sticky',
              stc  : 'stretch',
              sty  : 'style',
              src  : 'source',
              //##t
              tbl  : 'table',
              tim  : 'timing',
              temp : 'template',
              tsf  : 'transform',
              tsi  : 'transition',
              tsl  : 'translate',
              txt  : 'text',
              //##u
              uni  : 'unicode',
              //##v
              var  : 'variant',
              vis  : 'visibility',
              vtl  : 'vertical',
              //##w
              wei  : 'weight',
              wid  : 'width',
              wri  : 'writing',
              wra  : 'wrap',
              //##z
              zidx : 'z-index',
              

    },
    
    //##key
    keyWords  : [ 'align-content',
                  'align-items',
                  'align-self',
                  
                  'animation',
                  'animation-delay',
                  'animation-direction',
                  'animation-duration',
                  'animation-fill-mode',
                  'animation-iteration-count',
                  'animation-name',
                  'animation-play-state',
                  'animation-timing-function',
                  'appearance',
                  
                  'backface-visibility',
                  'background',
                  'background-attachment',
                  'background-blend-mode',
                  'background-clip',
                  'background-color',
                  'background-image',
                  'background-origin',
                  'background-position',
                  'background-repeat',
                  'background-size',  
                  'border',
                  'border-bottom',
                  'border-bottom-color',
                  'border-bottom-left-radius',
                  'border-bottom-right-radius',  
                  'border-bottom-style',
                  'border-bottom-width',
                  'border-collapse',
                  'border-color',
                  'border-image',  
                  'border-image-outset',  
                  'border-image-repeat', 
                  'border-image-slice', 
                  'border-image-source', 
                  'border-image-width', 
                  'border-left',
                  'border-left-color',
                  'border-left-style',
                  'border-left-width',
                  'border-radius', 
                  'border-right',
                  'border-right-color',
                  'border-right-style',
                  'border-right-width',
                  'border-spacing',  
                  'border-style',
                  'border-top',
                  'border-top-color',
                  'border-top-left-radius', 
                  'border-top-right-radius',
                  'border-top-style',
                  'border-top-width',
                  'border-width',
                  'bottom',
                  'box-decoration-break', 
                  'box-shadow', 
                  'box-sizing', 
                  
                  'caption-side',
                  'caret-color',
                  '@charset',
                  'clear',
                  'clip',
                  'color',
                  'column-count',
                  'column-fill',
                  'column-gap',
                  'column-rule',
                  'column-rule-color',
                  'column-rule-style',
                  'column-rule-width',
                  'column-span',
                  'column-width',
                  'columns',
                  'content',
                  'counter-increment',
                  'counter-reset',
                  'cursor',
                  
                  'direction',
                  'display',
                  'empty-cells',
                  'filter',
                  'flex',
                  'flex-basis',
                  'flex-direction',
                  'flex-flow',
                  'flex-grow',
                  'flex-shrink',
                  'flex-wrap',
                  'float',
                  'font',
                  '@font-face', 
                  'font-family',
                  'font-kerning',
                  'font-size',
                  'font-size-adjust',  
                  'font-stretch', 
                  'font-style',
                  'font-variant',
                  'font-weight',
                  
                  'grid',
                  'grid-area',
                  'grid-auto-columns',
                  'grid-auto-flow',
                  'grid-auto-rows',
                  'grid-column',
                  'grid-column-end',
                  'grid-column-gap',
                  'grid-column-start',
                  'grid-gap',
                  'grid-row',
                  'grid-row-end',
                  'grid-row-gap',
                  'grid-row-start',
                  'grid-template',
                  'grid-template-areas',
                  'grid-template-columns',
                  'grid-template-rows',
                  
                  'hanging-punctuation',
                  'height',
                  'hyphens',
                  '@import',
                  'isolation',
                  'justify-content',
                  '@keyframes',
                  'left',
                  'letter-spacing',
                  
                  'line-height',
                  'list-style',
                  'list-style-image',
                  'list-style-position',
                  'list-style-type',
                  
                  'margin',
                  'margin-bottom',
                  'margin-left',
                  'margin-right',
                  'margin-top',
                  'max-height',
                  'max-width',
                  '@media',
                  'min-height',
                  'min-width',
                  'mix-blend-mode',
                  
                  'object-fit', 
                  'object-position', 
                  'opacity', 
                  'order', 
                  'outline',
                  'outline-color',
                  'outline-offset',  
                  'outline-style',
                  'outline-width',
                  'overflow',
                  'overflow-x',  
                  'overflow-y',
                  
                  'padding',
                  'padding-bottom',
                  'padding-left',
                  'padding-right',
                  'padding-top',
                  'page-break-after',
                  'page-break-before',
                  'page-break-inside',
                  'perspective',
                  'perspective-origin',
                  'pointer-events',
                  'position',
                  'quotes',
                  
                  'resize',
                  'right',
                  
                  'scroll-behavior',
                  
                  'tab-size',
                  'table-layout',
                  'text-align',
                  'text-align-last',
                  'text-decoration',
                  'text-decoration-color',
                  'text-decoration-line',
                  'text-decoration-style',
                  'text-indent',
                  'text-justify',
                  'text-overflow',  
                  'text-shadow', 
                  'text-transform',
                  'top',
                  'touch-action',
                  '-ms-touch-action',
                  'transform',
                  'transform-origin',
                  'transform-style',
                  'transition',
                  'transition-delay',
                  'transition-duration',
                  'transition-property',
                  'transition-timing-function',
                  
                  'unicode-bidi', 
                  'user-select', 
                  
                  'vertical-align',
                  
                  'visibility',
                  
                  'white-space',
                  'width',
                  'will-change',
                  'word-break',  
                  'word-spacing',
                  'word-wrap',
                  'writing-mode',  
                  
                  'z-index',
                ],
                
    keymap    : null,
            
    handle    : {
      
      ppt  : (ppt,key,...args)=>{
          //$lg('4783::ppt',ppt);
          if(this.replica)return this;
          this._css.val_key(args[0],key);
          if(ppt == 'appearance'){
					    this._css.val_key(args[0],`-webkit-${key}`);
					}
          return this;
      },
      
    },
                
    //##vk(css)            
    val_key   : (...args)=>{
                  if(this.replica)return this;
                  //$lg('Css::val_key:828',args);
                  //alert(JSON.stringify(args));
                  if(args.length < 2){
                     //$lg('Css::val_key:830','args.length < 2',args);
                    //alert('Css::val_key:826:\nargs.length < 2');
                    return this;
                  }
                  
                  let val = args[0];
                  let key = args[1];
                  
                  if( /.+\!\s*$/.test(val) ){
                    val = val.replace('!','!important');
                  }
                  let code = `${key}:${val};`;
                  //$lg('5246::code::bgg',code);
                  //$lg('5247::this.object::bgb',this.object,this.object.type);
                  this.object.add(code);
                  /*try{
                    this.object.add(code);
                  }catch(e){
                    if(this.object.type != 'slt'){
                      alert('ajs::6274::没有调用slt()函数，\n请在style()后使用slt()函数');
                      return this;
                    }
                  }*/
                  return this;
                  
                },
    //##fmt
    format  : (arr)=>{
        let out = '';
        let maxLen = 0;
        let i = 0;
        for(let item of arr){
            let kvs = item.split(';')
            for(let kv of kvs){
                let k = kv.split(':')[0];
                if(k.length > maxLen) maxLen = k.length;
            }
        }
        for(let item of arr){
            i++;
            let kvs = item.split(';')
            let j = 0;
            for(let kv of kvs){
                if(kv.length == 0)continue;
                j++;
                let p = kv.split(':');
                let k = p[0];
                let v = p[1];
                if(i == 1)out += '\n'+' '.repeat(10);
                else      out += ' '.repeat(10);
                out += k.padEnd(maxLen+2)+`: ${v};`;
                if(kvs.length > 1) out+= '\n';
            }
        }
        
        return out;
    },
    
    //##obj(css)
    obj       : {
        //##frags
        frags : (...args)=>{
        
            let fgs = {
                type : 'frags',
                arr   : [],
                add   : function(frag){
                    this.arr.push(frag);
                },
                last  : function(){
                    //return frag
                    return this.arr[this.arr.length-1];
                },
                query : function(anyStr){
                    let DocObj = null;
                    for(let frag of this.arr){
                      DocObj = frag.query(anyStr);
                      if(DocObj) return DocObj;
                    }
                    return DocObj;
                },
                out : function(){
                    for(let frag of this.arr){
                        frag.out();
                    }
                },
            }
            return fgs;
        },
        //##frag
        frag  : (anyStr,topDocElm)=>{
            let dcdf = document.createDocumentFragment();
            let ofg = {
                ffn   : 'dom',
                type  : 'frag',
                que   : anyStr,
                top   : topDocElm,
                fgm   : dcdf,
                styles : [], //obj.styles
                
                query : function(anyStr){
                    for(let ObjStyle of this.styles){
                        let DocObj = ObjStyle.query(anyStr);
                        if(DocObj) return DocObj;
                    }
                },
                last  : function(){
                    return this.styles[this.styles.length-1];
                },
                add   : function(objStyle){
                    this.styles.push(objStyle);
                },
                out   : function(patt='new'){
                    if(patt == 'new'){
                        //新建模式
                        //向目标元素添加新的style
                        for(let ObjStyle of this.styles){
                            let DocStyle = ObjStyle.out();
                            this.fgm.appendChild(DocStyle);
                        }
                        this.top.appendChild(this.fgm);
                    }else if(patt == 'inc'){
                        //increment增量模式
                        //向相同id的style标签新增slt
                    }else if(patt == 'rep'){
                        //replace替换模式
                        //相同id的style标签替换相同签名的slt
                    }
                },
            }
        
            return ofg;
        },
        //##style
        style : (clazz='',id='')=>{
            let sty = this.docu.celm('style',id,clazz);
                sty.setAttribute('data-ajs-cidx',Css.cidx);
            Css.cidx++;
            return {
                ffn  : 'style',
                type : 'style',
                sty : sty,
              //slt or kf
                slts : [],
                kfs  : [],
                child : [],
                clone : (...args)=>{
                    return this.clone(...args);
                },
                html       : function(html){
                    this.sty.innerHTML = html;
                },
                add_slt    : function(obj_sltor){
                    this.slts.push(obj_sltor);
                },
                add_kf     : function(obj_keyframes){
                    this.kfs.push(obj_keyframes);
                },
                add_child  : function(obj_style){
                    //let proto = Reflect.getPrototypeOf(this);
                    //$lg('css::2896::listKeys(proto)',$log.listKeys(proto));
                    //$lg('css::2896::this.type',this.type);
                    this.child.push(obj_style);
                },
                last_slt   : function(){
                    return this.slts[this.slts.length-1];
                },
                last_kf    : function(){
                    return this.kfs[this.kfs.length-1];
                },
                last_child : function(){
                    return this.child[this.child.length-1];
                },
                /*query  : function(anyStr){
                  let search = function(ObjStyle,cidx){
                      if(ObjStyle.sty.getAttribute('data-ajs-cidx')==cidx) 
                          return ObjStyle.sty;
                      for(let child of ObjStyle.child ){
                          if(child.sty.getAttribute('data-ajs-cidx')==cidx) 
                              return child.sty;
                      }
                      return null;
                  }
                  let docStyle = Ajs.clone(this.sty);
                  $lg('2889:docStyle',docStyle);
                  $lg('2890::one',$log.strify.html.one(docStyle));
                  this.out(docStyle);
                  let docObj = docStyle.querySelector(anyStr);
                  if(docObj){
                      let cidx = docObj.getAttribute('data-ajs-cidx');
                      if(cidx){
                          return search(this,cidx);
                      }else{
                          let   msg  = 'ajs.js::Css::_css::obj::style:2919\n';
                                msg += 'cidx == null:\n';
                                msg += `your input : '${anyStr}'`;
                          alert(msg);
                      }
                  }else{
                      let msg  = 'ajs.js::Css::_css::obj::style:2922\n';
                          msg += '在当前的ObjStyle中找不到你指定的内容:\n';
                          msg += `your input : '${anyStr}'`;
                      alert(msg);
                  }
                },  */
                query      : function(id){
                    if(this.sty.id == id) return this;
                    for(let child of this.child ){
                        if(child.sty.id == id) return child;
                    }
                    return null;
                },
                out  : function(DocStyle = this.sty){
                  
                  //let head = ' '.repeat(2) + `${this.slt}`;
                  let arr = [];
                  if(this.slts.length>0){
                      let cont = '';
                      for(let obj_slt of this.slts){
                          cont += obj_slt.out();
                      }
                      DocStyle.innerHTML += cont;
                  }
                  if(this.kfs.length>0){
                      let cont = '';
                      for(let obj_kf of this.kfs){
                          cont += obj_kf.out();
                      }
                      DocStyle.innerHTML += cont;
                  }
                  if(this.child.length>0){
                      for(let chd of this.child){
                        DocStyle.appendChild(chd.out());
                      }
                  }
                  return DocStyle;
                },
          };
        },
        //##sltor
        sltor : (slt)=>{
          return {
                  slt : slt ,
                  fmt : (...args)=>{
                      return this._css.format(...args);
                  },
                  type : 'slt',
                  //propertys
                  codes : [] ,
                  add  : function(kvstr){
                      this.codes.push(kvstr) ;
                      //$lg('5031::codes:::bgy',...this.codes);
                      return this;
                  },
                  out  : function(){
                      let head = '\n' + ' '.repeat(4) + `${this.slt}`;
                      let cont = this.fmt(this.codes);
                      /*for(let code of this.codes){
                          cont += ' '.repeat(6) + code + '\n';
                      }*/
                      let str  = `${head}{  `;
                          str += `${cont}`
                          str += ' '.repeat(4)+'}\n';
                      return str;
                  },
            }
        },
        //##kf
        //##@type:w='-webkit-', m='-moz-'
        kf : (name,webkit='')=>{
            return {
              wk   : webkit,
              name : name,
              type : 'kf',
              pcs  : [],
              add  : function(pco){
                  this.pcs.push(pco);
              },
              last : function(){
                  return this.pcs[this.pcs.length-1];
              },
              out  : function(){
                  let head = '\n'+' '.repeat(4) + `@${this.wk}keyframes ${this.name}`;
                  let cont = '';
                  for(let pco of this.pcs){
                      cont += pco.out();
                  }
                  return `${head}{\n${cont}`+' '.repeat(4)+`}\n`;
              },
            }
        },
        //##pc
        pcent : (val)=>{
            return {
                type : 'pc',
                pcent : val,
                codes  : [],
                fmt   : (...args)=>{
                    return this._css.format(...args);
                },
                add   : function(kvstr){
                    this.codes.push(kvstr);
                    return this;
                },
                out   : function(){
                    let cont = this.fmt(this.codes);
                    
                    
                    /*
                    for(let item of this.codes){
                        cont +=  item ;
                    }
                    */
                    let pc   = ' '.repeat(6)+`${this.pcent}`.padStart(3,' ');
                    let str  = `${pc}%{${cont}`;
                        str += ' '.repeat(10)+`}\n`;
                    return str;
                },
            }
        },
     
    },
    
    //##reset
    reset     : ()=>{
        this.cmds = [];
        this.fastMode = 0;
        this.replica  = 0;
        this.object      = undefined;
        this.topObject   = undefined;
        this.styleObject = undefined;
        this.frags       = this._css.obj.frags();
        //this.dom('head');
        this.dom(this.lastDom);
        
        return this;
      },
  
    //##spread
    spread    : (...args)=>{
                  //$lg('Css::spread:849',args);
                  let i = 0;
                  let key = '';
                  for(let a of args){
                    let aa = a;
                    try{ aa = Reflect.get(this._css.abbr,a)}
                    catch(err){alert('Css::spread:855:err:'+err.message)};
                    let cc = aa == undefined ? a : aa;
                    key += "-".repeat(i) + `${cc}`;
                    i = 1;
                  }
                  //alert(key);
                  //$lg('Css::spread:861',key);
                  return key;
                },
    //##define
    define    : (ppt,key,callback)=>{
                    Reflect.defineProperty( Css.prototype, ppt, {
          						name : ppt,
          						value: function(val){
          						  return callback(val,key=`${key}`);
          						}
          					});
                },
  
    autorun   : ()=>{
        
        //$lg('5433::autorun start',Log.now());
        //let ppt2Arr = [];      
        //let sty = 'bgg';
        let keyWords = this._css.keyWords;
        for(let key of keyWords){
          // font-size-adjust -> font_size_adjust
          let ppt1 = key.replace(/\-/g,'_');
          /*if(key == 'border-top-right-radius'){
            $lg('6606::border-top-right-radius::bgo',ppt1);
          }*/
          //this._css.define(ppt1,key,this._css.val_key);
          Css.keymap.set(ppt1,key);
          /*if(key == 'vertical-align'){
            $lg('6836:vertical-align::bgo',`ppt1:${ppt1}`);
          }*/
          //$lg('5436::'+sty,key);
          //$lg(ppt1);
          Reflect.defineProperty( Css.prototype, ppt1, {
						name : ppt1,
						value: function(...args){
						  return this._css.handle.ppt(ppt1,key,...args);
						}
					});
					
					
					
					
          // font-size-adjust -> fontSizeAdjust
          let arr = key.split('-');
          if(arr.length == 1) continue;
          //$lg('5159::bgg',...arr);
          let i = 0;
          let ppt2 = '';
          
          for(let word of arr){
            
            let p1 = word.substr(0,1).toUpperCase();
              if(i == 0)p1 = word.substr(0,1).toLowerCase();
            let p2 = word.slice(1).toLowerCase();
            ppt2 += p1 + p2;
            i++;
          }
          //ppt2Arr.push(ppt2);
          //$lg(ppt2);
          Css.keymap.set(ppt2,key);
          Reflect.defineProperty( Css.prototype, ppt2, {
    						name : ppt2,
    						value: function(...args){
    						  return this._css.handle.ppt(ppt2,key,...args);
    						}
    			});
        
          
        }
        //$lg('5179::bgb',...ppt2Arr);
          //alert(k2);
          //this._css.define(ppt2,key,this._css.val_key);
        //$lg('5479::autorun end',Log.now());
    },
    
  }
  
}



//@xhr
/**
 * addr : address   , "../code/php/nur.php"
 * op   : operation , "getData" or "saveData"
 * da   : data      , {a:111,b:222}
 * 
 * let xhr = new Xhr(addr);
 *     xhr.ask(op,da)
 *        .rsp((data)=>{
 * 
 *        },(err)=>{
 * 
 *        })
 **/ 
//import {Html,Log}
export class Xhr{
  constructor(addr,type='json',key='opda'){
    this.addr = addr;
    //$lg('6193::xhr::addr',addr);
    this.opda = '';//this.pack(op,da);
    this.key = key;
    this.header = this.headers.app;
    this.respType = 'text';
    this.portNum = null;
    //this.rsp(rsp,err);
    if(window.$lg == undefined){
        //new Log();
    }
    
    //$lg('6329::this.header',this.header);
    
  }
  
  port(val){
    this.portNum = val;
  }
  
  json(val){
    if(val === 1) {
      this.setHeader('json');
      this.respType = 'json';
    }
    return this;
  }
  
  headers = {
    
      app       : "application/x-www-form-urlencoded; charset=UTF-8",
      
      json      : 'application/json; charset=UTF-8',
      
      es        : "text/event-source",
      
      html      : "text/html",
      
      fmdata    : ()=>{
        let s = Math.random();
            s = encodeURIComponent(s);
            //$lg('6341::xhr::s',s);
        let h = `multipart/form-data; boundary=----<${s}>----`;
        $lg('6343::xhr::h',h);
        
        return h;
      },
  }
  
  setHeader(s){
    let h = Reflect.get(this.headers,s);
    let t = typeof(h);
    if( t == 'string' )   this.header = h;else 
    if( t == 'function')  this.header = h();else 
    if( t == 'undefined') this.header = s;
    return this;
  }
  
  key(k){
    this.key = k;
    return this;
  }
  
  pack(op,da) {

    let key   = this.key;
    let value = {
        op      : op,
        da      : da
    };
    let gift = encodeURIComponent( key ) + "=" + encodeURIComponent( JSON.stringify(value) );
    //let opda = properEncodeURIComponent( key ) + "=" + properEncodeURIComponent( JSON.stringify(value) );
    return gift;
    
  }
  
  _req = (addr,opda)=>{
    //$lg('Xhr::req:6948:',addr,opda);
    let promise = new Promise((resolve, reject)=>{
      
      //$lg('Ready state:', this.readyState);
      //$lg('Status:', this.status);
    
      
      
      //let header  = "application/x-www-form-urlencoded; charset=UTF-8";
      let header  = this.header;
      //let header  = "text/event-source";
      let handler = function(){
          if (this.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject({code:this.status,text:this.statusText});
          }
      };
    
      let address = addr;
      
    
      if(this.portNum > 1){
        address = new URL(addr,window.location.href);
        // 修改端口号
        address.port = this.portNum;
        //$lg('6977::address::bgy',address,this.portNum);
      }
      //$lg('6979::address::bgy',address,this.portNum,address.toString());
    
    
      let http = new XMLHttpRequest();
           //alert('Log::2999:this.pget:'+this.pget);
            
        //$lg('Ajs::Xhr:req:3012');
        http.timeout = 1000 * 20;
        //let opda = task_build_request(user, op, da);
        http.open('post', address.toString(),true);
        http.setRequestHeader("Content-Type",header);
        http.onreadystatechange = handler;
        //http.setRequestHeader("Connection","Keep-Alive");
        //http.setRequestHeader("Keep-Alive","timeout=50, max=100");
        
        http.responseType = this.respType;
        http.send(opda);    
            
    });
    return promise;
  }
  
  ask(op,da=null){
    this.opda = this.pack(op,da);
    return this;
  }
  
  
  up(formdata){
    this.setHeader('fmdata')
    $lg('6420::this.header',this.header);
    this.opda = formdata;
    return this;
  }
  
  upload(...args){
    return this.up(...args);
  }
  
  /**
   * rsp  : respone
   * suc  : callback function
   * err  : callback function
   **/ 
  rsp(suc,err){
    this._req(this.addr,this.opda)
        .then(function(data) {
            suc(data);
            //$lg('Contents: ' + data);
        }, function(error) {
            err(error);
            //console.error('出错了', error);
        });
  }
  
}


//////////////////////////////////////////////////////////////////////////
//  使用方法:
//
//  以下例子将sql以及其它信息通过socket发送至nodejs执行
//  nodejs 解读sql和其它信息后执行sql,从数据中读取blob格式的mp3数据
//  成功读取后使用socket返回数据给浏览器
//
//  const file = `../app/dat/mp3_0000.sqlite3`;  
//  const sql  = `select dat from mp3 where id = 4`;
//  let op = 'data__stream_blob';
//  let da = {file,sql};
//  let opda = {op,da};
//  const socket = new Socket('ws://127.0.0.1:8081');
//        socket.sendObj(opda);

//  1.promise:
//  const data = await socket.promise(op);
//  const mp3Blob = new Blob([data], { type: 'audio/mpeg' });  
//  let url = URL.createObjectURL(mp3Blob);  

//  2.event:
//        socket.on(op,()=>{
//          ...
//        });
//  
//////////////////////////////////////////////////////////////////////////
export class Socket{
  
  constructor(addr){
    
    this.socket = new WebSocket( addr );
    this.socket.addEventListener("message", this.handler,0);
    /*this.socket.addEventListener('open',()=>{
    })*/
  }
  
  _getState(){
    //$lg('ajs:_getState','this.socket.readyState',this.socket.readyState);
    return new Promise((ok)=>{
      
      if(this.socket.readyState == 1){
        ok();
      }else
      if(this.socket.readyState == 0){
        //$lg('ajs:_getState:0::bgb');
        this.socket.addEventListener('open',()=>{
          //$lg('ajs:_getState:onopen::bgg','ok');
          ok();
        },0)
      }
      
    })
    
  }
  
  handler(event){
    try{
      //$lg('ajs:7096::bgb','this.socket.binaryType',this.socket.binaryType,typeof event.data);
      
      const type = typeof event.data;
      if( type == 'string'){
        let obj = JSON.parse(event.data);
        let op = obj.op;
        let da = obj.da;
        $lg('10403','socket.handler',event.data);
        let eve = new CustomEvent(op, {detail: da});
        document.dispatchEvent(eve);
      }else
      if( type == 'object' ){
        //$lg('ajs:7108::bgg','object');
        let eve = new CustomEvent('socketGotObject', {detail: event.data});
        document.dispatchEvent(eve);
        
        
        /*
        const mp3Blob = new Blob([event.data], { type: 'audio/mpeg' });  
        let url = URL.createObjectURL(mp3Blob);  
        $lg('12348:url',url);
        this.audio.load(url);
        */
        //this.audio.src = url;
        // 使用MSE API将Blob数据进行处理和播放  
        /*
        let mediaSource = new MediaSource();  
        let sourceBuffer;  
      
        this.audio.src = URL.createObjectURL(mp3Blob);  
        mediaSource.addEventListener('sourceopen', () => {  
          sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');  
        });  
        const chunk = event.data;  
        if (sourceBuffer.updating) {  
          return;  
        }  
        sourceBuffer.appendBuffer(chunk);  
        */
      }
    }catch(e){
      //$lg('12337::bgy','socket typeof event.data',typeof event.data,typeof event.data == 'string' ? event.data : null);
      //$lg('12338::bgg','this.socket.binaryType',this.socket.binaryType);
      //$log.lgg(event.data);
      //$lg('ajs:7138::bgo',e.message);
    }
  }
  
  sendObj = async (obj)=>{
    await this._getState();
    this.socket.send(JSON.stringify(obj));
    return this;
  }
  
  sendBin = async (obj)=>{
    await this._getState();
    this.socket.send(obj);
    return this;
  }
  
  send = async (obj)=>{
    await this._getState();
    this.socket.send(obj);
    return this;
  }
  
  //////////////////////////////////////////////////////////////////////////
  // let data = await on('object')// 固定'object'指代socket返回object格式数据
  // let da = await on('something')// something可任意指定相应的经过约定的字符串
  //////////////////////////////////////////////////////////////////////////
  on(op,callback){
      
      document.addEventListener(op,(event)=>{
          //$lg('ajs:socket:7210:on');
          callback({op,da:event.detail});
      },0)
    
  }
  
  promise(op){
  
    return new Promise((ok)=>{
      
      document.addEventListener(op,(event)=>{
          $lg('ajs:7222::bgb','promise',op);
          ok( {op, da:event.detail} )
      },0)
      
    })
    
  }
  
  gotObject(){
    return new Promise((ok)=>{
      
      document.addEventListener('socketGotObject',(event)=>{
          ok(event.detail)
      },0)
    })
  }
  
}

//@log
export class Log{
  constructor(mode='htm',color='white'){
    if(window.$lg) return;
    this.x = 0;
    this.y = 0;
    
    this.icc  = -1;
    this.idsp = -1;//btn for switching lgHtml ot lgText
    this.itop = 1;
    this.execTimes = 0;
    window.$lg = this.log;
    window.$log = this;
    window.$now = ()=>{ return Log.now()};
    this.lastClickId = 'lgToolBtnDsp';
    this.txt = '';
    this.debugMode = 1;
    this.mode = mode;
    this.color = color;
    //$lg('Log::6250::this.color:',this.color);
    this.css().htm().event.setup();
    this.topbar.init();
    this.progress.into('#lgShowbox',10);
    
    document.getElementById('lgHtml')
    .addEventListener('click',(e)=>{
      
      let ds = e.target;
      let dp = e.target.parentElement;
      //alert('lgHtml clicked\n'+ds.className);
      
      if( e.type == 'click' && ds.classList.contains('log-htm-txt')){
        let track = dp.querySelector('.lgTrackInfo');
        if( track ){ 
          if( track.style.display == 'none' || track.style.display == null )
              track.style.display = 'block';
          else
              track.style.display = 'none';
            
        }
      }
    })
    
  }
  
  debug(mode=1){
      this.debugMode = mode;
      return this;
  }
  
  //#api
  api = {
    elm : (tag,id,cl='',text='',onEventArr=null)=>{
            let e = document.createElement(tag);
                if(id   !== '') e.setAttribute('id',id);
                if(cl   !== '') e.setAttribute('class',cl);
                if(text !== '') e.innerHTML = text;
                if(onEventArr !== null && Array.isArray(onEventArr)){
                    for(let evt of onEventArr){
                        //e.setAttribute(evt.name,evt.callback);
                        Reflect.set(e,evt.name,evt.callback);
                    }
                }
            return e;
          },
    text: (id,txt)=>{
            let e = document.querySelector('#'+id);
                e.innerText = txt;
            return this.api;
          },
    html: (id,txt)=>{
            let e = document.querySelector('#'+id);
                e.innerHTML = txt;
            return this.api;
          },
    fg  : ()=>{
            let fg = document.createDocumentFragment();
            return fg;
          },
    show  : (str)=>{
                let arr = document.querySelectorAll(str);
                for(let a of arr){
                    a.style.visibility = 'visible';
                }
                return this;
            },
    hide  : (str)=>{
                let arr = document.querySelectorAll(str);
                for(let a of arr){
                    a.style.visibility = 'hidden';
                }
                return this;
            },
    zindex : (str,idx)=>{
                    let arr = document.querySelectorAll(str);
                    for(let a of arr){
                        a.style.zIndex = idx;
                    }
                    return this;
                },
    style : (slt,prop,val)=>{
                    let arr = document.querySelectorAll(slt);
                    for(let a of arr){
                        
                        Reflect.set(a.style,prop,val);
                    }
                    return this;
                },
    add   : {
        style : (id,html='',onEventArr=null)=>{
            let s = document.createElement('style');
                s.setAttribute('id',id);
            if(html !== '') s.innerHTML = '\n' + ' '.repeat(4) + html + '\n' ;
            if(onEventArr !== null && Array.isArray(onEventArr)){
                for(let evt of onEventArr){
                    s.setAttribute(evt.name,evt.callback);
                }
            }
            return s;
        },
        children :  (topObject,arrChildren)=>{
                        let arr =[];
                        for(let child of arrChildren){
                            //topObject.appendChild(child);
                            arr.push(child);
                        }
                        topObject.append(...arr);
                        return this;
                    },
    },
    attr  :  (obj,prop,val)=>{
                obj.setAttribute(prop,val);
            },
    gbid  :  (id)=>{
                return document.getElementById(id);
            },
    query :  (anyStr)=>{
                return document.querySelector(anyStr);
    },
    setdata  :  (obj,key,val)=>{
        obj.setAttribute('data-'+key,val);
    },
  }
  
  //#rgba(log)
  rgba = {
    red     : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; return `rgba(  ${x},     0,      0,  ${opc} )` ;},
    yellow  : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; return `rgba(  ${x},  ${x},      0,  ${opc} )` ;},
    blue    : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; return `rgba(     0,     0,   ${x},  ${opc} )` ;},
    green   : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; return `rgba(     0,  ${x},      0,  ${opc} )` ;},
    fuchsia : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; return `rgba(  ${x},     0,   ${x},  ${opc} )` ;},
    aqua    : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; return `rgba(     0,  ${x},   ${x},  ${opc} )` ;},
    white   : ( i, opc=1, div=16 )=>{ let one = 256/div; let x = (div-i)*one-1; return `rgba(  ${x},  ${x},   ${x},  ${opc} )` ;},
    rgb     : ( r, g, b )=>{ return `rgb(  ${r},  ${g},  ${b}  )` ;},
    get     : (color, i, opc=1, div=16 )=>{
                //if(color == undefined )color = 'yellow';
                return Reflect.get(this.rgba,color)(i,opc,div);
              },
    arr     : (n, i, opc=1, div=16)=>{
                let arr = ['red','yellow','blue','green','fuchsia','aqua','white'];
                return this.rgba.get(arr[n],i,opc,div);
              },
  }
  
  //#htm
  htm = ()=>{
    
    if(document.getElementById('lg')) return this;
   
    let frag = this.api.fg();
    
    let btn1 = this.api.elm('button','lgToolBtnClear','lgToolbtns','clear');
    let btn2 = this.api.elm('button','lgToolBtnDsp','lgToolbtns','txt');
    let txt_upload = this.api.elm('button','lgToolBtnTxtUpload','lgToolbtns','upload');
    let js_beauty = this.api.elm('button','lgToolBtnJsBeauty','lgToolbtns','beauty');
    let btn3 = this.api.elm('button','lgToolBtnChar','lgToolbtns','char');
    let btn4 = this.api.elm('button','lgToolBtnIcon','lgToolbtns','icon');
    let btn5 = this.api.elm('button','lgToolBtnSQL','lgToolbtns','SQL');
    let btn6 = this.api.elm('button','lgToolBtnDocu','lgToolbtns','docu');
    let btn7 = this.api.elm('button','lgToolBtnTopbar','lgToolbtns','topbar');
  
    let icon = this.api.elm('div','lgIcon');
    let text = this.api.elm('textarea','lgText');
    let html = this.api.elm('div','lgHtml','lgCol');
    
    let titSpan = this.api.elm('span','lgTitleText');
    let title   = this.api.elm('div','lgTitle');
        title.append(titSpan);
    
    let close = this.api.elm('div','lgClose','lgClose',`\u2612`);
    let close1 = this.api.elm('div','lgToolbarClose','lgClose',`\u2612`);
   
    
    let toolbar = this.api.elm('div','lgToolbar');
        toolbar.append(close1);
    
    let tba = [];
        tba.push(btn1);
        tba.push(btn6);
        tba.push(btn2);
        tba.push(txt_upload);
        tba.push(btn7);
        tba.push(btn3);
        tba.push(btn4);
        tba.push(js_beauty);
        tba.push(btn5);
    let toolbox = this.api.elm('div','lgToolbox');
        toolbox.append(...tba);
        
    let ipt = this.api.elm('textarea','lgIpt','h50');
        ipt.rows = '1';
        
    let btnEnter = this.api.elm('button','lgbtnEnter','h50','\u25e3');
    let mutiline = this.api.elm('button','lgbtnMline','h50','\u25b2');
        
             
    let cmda = [];
        cmda.push(ipt);
        cmda.push(btnEnter);
        cmda.push(mutiline);
    let cmd = this.api.elm('div','lgCmd','lgRow');
        cmd.append(...cmda);
    
    let caption = this.api.elm('div','lgCaption');
        caption.append(title,close);
        
        
    let showbox = this.api.elm('div','lgShowbox');
        showbox.append(text,html);
        
    
    let display = this.api.elm('div','lgDisplay','lgRow');
        display.append(showbox,toolbox,toolbar);
        
    let wind = this.api.elm('div','lgWind','lgCol');
        wind.append(caption,display,cmd);
      
    
    let log = this.api.elm('div','lg','lgBlk');
        log.append(icon,wind);
        
    
    frag.append(log);
    document.body.append(frag);
    return this;
  }
  
  //#css
  css(){
    
    if(document.getElementById('cssLg')) return this;
    //let bg = this.rgba.get(this.color,12,0.80);
     
    let txt_blk         = `.lgBlk{
            display         : block;
            position        : absolute;
            padding         : 1vmin;
    }`;
    let txt_track       = `.lgTrackInfo{
            display         : none;
    }`;
    let txt_lgCol       = `.lgCol{
            display         : flex;
            flex-direction  : column;
            justify-content : flex-start;
            align-items     : center;
    }`;
    let txt_lgRow       = `.lgRow{
            display         : flex;
            flex-direction  : row;
            justify-content : center;
            align-items     : center;
    }`;
    let txt_h50         = `.h50{
            height          : 100%;
            //z-index         : 2020;
    }`;
    let txt_lgToolbtns  = `.lgToolbtns{
            position        : relative;
            display         : inline-block;
            width           : 100px;
            height          : 60px;
            border-radius   : 16px;
            //z-index         : 2023;
            padding         : 6px;
            font-size       : 3vmin;
            box-shadow      : none;
            border          : 1px solid transparent;
    }`;
    let txt_dspFlex     = `.dspFlex{
            position        : relative;
            display         : flex;
            flex-direction  : column;
            justify-content : flex-start;
            align-items     : flex-start;
            padding         : 6px;
            margin          : 0px;
            font-size       : 4vmin;
            height          : 100%;
            //z-index         : 9000;
            border-radius   : 0px;
    }`;
    let txt_dspTop      = `.dspTop{
            background      : lightyellow;
            width           : 100%;
            height          : 100px;
            overflow        : scroll;
            //z-index         : 9000;
    }`;
    let txt_dspChild    = `.dspChild{
            position        : relative;
            display         : inline-block;
            left            : 10px;
            top             : 20px;
            background      : white;
            width           : 450px;
            height          : auto;
            margin          : 10px;
            overflow        : auto;
            
            padding-left    : 6px;
            //z-index         : 9010;
            
    }`;
    let txt_dspKeys     = `.dspKeys{
            
            position        : relative;
            display         : block;
            background      : yellow;
            color           : black;
            border-radius   : 1px;
            width           : auto;
            height          : auto;
            padding-top     : 6px;
            padding-left    : 6px;
            //z-index         : 9090;
            font-size       : 4vmin;
            overflow        : scroll;
    }`;
    let txt_dspGson     = `.dspGson{
              top           : 70px;
              //z-index       : 9000;
              margin        : 20px;
              overflow      : scroll;
              
    }`;
    let txt_lightblue   = `.lightblue{
              background    : green;
              color         : white;
              height        : 60px;
    }`;
    let txt_lg          = `#lg{
            left            : 0px;
            top             : 0px;
            height          : 99%;
            width           : 99%;
            background      : transparent;
            padding         : 0px;
            //z-index         : 6600;
    }`;
    let txt_lgWind      = `#lgWind{
            position        : relative;
            display         : flex;
            visibility      : hidden;
            flex-direction  : column;
            justify-content : flex-start;
            align-items     : center;
            top             : 0px;
            left            : 0px;
            height          : 99%;
            width           : 99%;
            background      : ${this.rgba.get(this.color,10,1)};
            color           : black;
            padding         : 10px;
            border          : 0px solid blue;
            transition      : display 0.4s ease;
            //z-index         : 6600;
            
    }`;
    let txt_lgDisplay   = `#lgDisplay{
            position        : relative;
            display         : flex;
            flex-direction  : row;
            justify-content : space-between;
            align-items     : flex-start;
            width           : 95%;
            height          : 80%;
            left            : 0px;
            margin          : 6px;
            padding         : 20px;
            border          : 0px solid green;
    }`;
    let txt_lgCaption   = `#lgCaption{
            position        : relative;
            display         : flex;
            flex-direction  : row;
            justify-content : space-between;
            align-items     : center;
            width           : 95%;
            height          : 80px;
            font-size       : 6vmin;
            color           : black;
            border          : 0px solid black;
            padding         : 10px;
            margin          : 10px;
            zindex          : 6601;
    }`;
    let txt_lgTitle     = `#lgTitle{
            position        : relative;
            display         : flex;
            flex-direction  : row;
            justify-content : center;
            align-items     : center;
            text-align      : center;
            background      : transparent;
            color           : white;
            width           : 90%;
            padding-top     : 5px;
            border          : 0px solid red;
    }`;
    let txt_lgClose     = `.lgClose{
            position        : relative;
            top             : 0px;
            right           : 0px;
            text-align      : center;
            font-size       : 9vmin;
            border          : 0px solid ${this.rgba.get(this.color,6,0.8)};
            color           : white;
            width           : 10%;
            
    }`;
          
    let txt_lgShowbox   = `#lgShowbox{
            display         : block;
            position        : relative;
            height          : 100%;
            width           : 90%;
            overflow        : scroll;
            border-right    : 0px solid black;
            padding         : 0px;
            border-radius   : 10px;
    }`;
    let txt_lgCmd       = `#lgCmd{
            position        : relative;
            height          : 70px;
            width           : 95%;
            padding         : 3px;
            border-top      : 0px solid black;
            
    }`;
    let txt_lgIcon      = `#lgIcon{
            background      : black;
            opacity         : 0.2;
            padding         : 6px;
            width           : 60px;
            height          : 60px;
            position        : fixed;
            display         : block;
            top             : 100px;
            left            : 100px;
            border-radius   : 50%;
            z-index         : 100;
    }`;
    let txt_lgText      = `#lgText{
            position        : absolute;
            left            : 0px;
            top             : 0px;
            display         : block;
            overflow        : scroll;
            white-space     : pre-line;
            font-size       : 3vmin;
            width           : 100%;
            padding         : 20px;
            height          : 100%;
            border          : 0px solid black;
            border-radius   : 10px;
            //z-index         : 2020;
            background      : ${this.rgba.get(this.color,1,0.99)};
            color           : black;
    }`;
    let txt_lgHtml      = `#lgHtml{
            position        : absolute;
            left            : 0px;
            top             : 0px;
            display         : flex;
            flex-direction  : column;
            justify-content : flex-start;
            align-items     : flex-start;
            overflow        : scroll;
            white-space     : pre;
            font-size       : 3vmin;
            width           : 96%;
            height          : 98%;
            border          : 0px solid green;
            border-radius   : 10px;
            padding         : 16px;
            background      : ${this.rgba.get(this.color,8,0.99)};
    }
    .log-htm-item{
            position        : relative;
            
            display         : flex;
            flex-direction  : column;
            justify-content : center;
            align-items     : flex-start;
            overflow-wrap   : break-spaces;
            white-space     : pre;
            font-size       : 3vmin;
            width           : 96%;
            height          : auto;
            border          : 2px solid ${this.rgba.get(this.color,5,0.99)};
            border-radius   : 10px;
            padding         : 3px;
            margin          : 10px;
            background      : ${this.rgba.get(this.color,8,0.99)};
    }
    .log-htm-txt{
            position        : relative;
            font-size       : 3vmin;
            width           : 97%;
            min-height      : 50px;
            
            border          : 0px solid blue;
            border-radius   : 6px;
            padding         : 6px;
            padding-top     : 16px;
            margin          : 3px;
            overflow-x      : scroll;
            word-break      : break-word;
            background      : ${this.rgba.get(this.color,4,0.9)};
            color           : ${this.rgba.get(this.color,13,0.99)};
    }
    .log-htm-red{
            color           : red;  
    }
    .log-htm-yellow{
            color           : yellow;  
    }
    .log-htm-blue{
            color           : blue;  
    }
    .log-htm-orange{
            color           : orange;  
    }
    .log-htm-green{
            color           : green;  
    }
    .log-htm-red{
            color           : red;  
    }
    .log-htm-bg-blue{
            color           : white;  
            background      : lightblue;  
    }
    .log-htm-bg-orange{
            color           : white;  
            background      : orange;  
    }
    .log-htm-bg-green{
            color           : white;  
            background      : lightgreen;  
    }
    .log-htm-bg-yellow{
            color           : black;  
            background      : yellow;  
    }

    .hide{
      display               : none;
    }
    .flex{
      display               : flex;
    }
    #lgHtml .item{
      position              : relative;
      display               : flex;
      flex-direction        : column;
      justify-content       : flex-start
      align-items           : flex-start
      margin                : 10px;
      margin-left           : 20px;
      padding               : 10px;
      background            : transparent;
      color                 : black;
      font-size             : 4vmin; 
      //border : 1px solid yellow;
    }
    #lgHtml .child{
      position              : relative;
      flex-direction        : column;
      justify-content       : flex-start
      align-items           : flex-start
      margin                : 10px;
      margin-left           : 20px;
      padding               : 10px;
      background            : transparent;
      color                 : black;
      font-size             : 4vmin;  
      transition            : 0.3s ease;
      //border-left : 2px solid white;
      //border : 2px solid hsl(160,30%,70%);
    }
    
    
    
    #lgHtml .bdr{
      background            : hsl(0,0%,70%);
      color                 : hsl(0,0%,20%);
      border : 1px solid white;
      border-radius : 20px;
    }
    #lgHtml .title{
      //background            : transparent;
      
      color                 : hsl(0,0%,20%);;
      padding               : 16px;
      width                 : auto; 
      border : 1px solid white;
      border-radius : 20px;
    }
    
    #lgHtml+.title:before{
      display    : none;
    }
    #lgHtml .title:before{
      position    : absolute;
      content               : '';
      //border-bottom         : 2px solid white;
      //border-left           : 2px solid white;
      left : -0.8em;
      top : -1.2em;
      width                 : 1em;
      height                : 91%;
      //background : lightyellow;
      margin : 1px;
      
    }
    /*#lgHtml .title:nth-child(1):before{
      height                : 70%;
    }*/
    
     #lgHtml>.item:before{
       display : none;
     }
    
    `;
    let txt_lgToolbox   = `#lgToolbox{
            position        : relative;
            top             : 0;
            width           : 16%;
            height          : 99.6%;
            padding         : 0px;  
            margin-left     : 10px;
            display         : flex;
            flex-direction  : column;
            justify-content : space-around;
            align-items     : center;
            border          : 0px solid red;
            background      : ${this.rgba.get(this.color,6,1)};;
            border-radius   : 16px;
    }`;
    let txt_lgToolbarCL = `#lgToolbarClose{
            position        : fixed;
            display         : none;
            right           : 36px;
            top             : 150px;
            /*background      : red;
            border          : red solid 3px;*/
    }`;
    let txt_lgToolbar   = `#lgToolbar{
            position        : fixed;
            right           : 10px;
            top             : 157px;
            width           : 0px;
            height          : 77.6%;
            padding         : 0px;  
            margin          : 0px;
            display         : flex;
            flex-direction  : column;
            justify-content : space-around;
            align-items     : center;
            border-radius   : 10px;
            border          : 0px solid red;
            background      : ${this.rgba.get(this.color,8,1)};
            transition      : width 0.3s ease;
            //z-index         : 9900;
            /*background      : red;
            border          : red solid 3px;*/
    }`;
    let txt_lgInput     = `#lgIpt{
            width           : 70%;
            font-size       : 4vmin;
            position        : relative;
            height          : 100%;
            vertical-align  ：text-top;
            word-wrap       : pre-line;
    }`;
    let txt_lgEnter     = `#lgbtnEnter{
            width           : 15%;
            font-size       : 4vmin;
            position        : relative;
            height          : 100%;
    }
    #lgbtnMline{
            width           : 15%;
            font-size       : 4vmin;
            position        : relative;
            height          : 100%;
    }`;
    
    let fg          = this.api.fg();
    let lg          = this.api.add.style('cssLg',       txt_lg);
    let lgIcon      = this.api.add.style('cssLgIcon',   txt_lgIcon);
  
    let lgWind      = this.api.add.style('cssLgWind',   txt_lgWind);
    let lgCaption   = this.api.add.style('cssLgCaption',txt_lgCaption);
    let lgTitle     = this.api.add.style('cssLgTitle',txt_lgTitle);
    let lgClose     = this.api.add.style('cssLgClose',txt_lgClose);
    let lgDisplay   = this.api.add.style('cssLgDisplay',txt_lgDisplay);
    let lgShowbox   = this.api.add.style('cssLgShowbox',txt_lgShowbox);
    let lgText      = this.api.add.style('cssLgText',   txt_lgText);
    let lgHtml      = this.api.add.style('cssLgHtml',   txt_lgHtml);
    let lgToolbox   = this.api.add.style('cssLgToolbox',txt_lgToolbox);
    let lgToolbar   = this.api.add.style('cssLgToolbar',txt_lgToolbar);
    let lgToolbarCL = this.api.add.style('cssLgToolbarCL',txt_lgToolbarCL);
    let lgCmd       = this.api.add.style('cssLgCmd',    txt_lgCmd);
    let lgInput     = this.api.add.style('cssLgInput',  txt_lgInput);
    let lgEnter     = this.api.add.style('cssLgEnter',  txt_lgEnter);
    let lgId        = this.api.add.style('cssLgId');
    let lgClass     = this.api.add.style('cssLgClass');
    let lgCol       = this.api.add.style('cssLgCol',    txt_lgCol);
    let lgRow       = this.api.add.style('cssLgRow',    txt_lgRow);
    let dspFlex     = this.api.add.style('cssDspFlex',  txt_dspFlex);
    let dspChild    = this.api.add.style('cssDspChild', txt_dspChild);
    let dspKeys     = this.api.add.style('cssDspKeys',  txt_dspKeys);
    let dspGson     = this.api.add.style('cssDspGson',  txt_dspGson);
    let lightblue   = this.api.add.style('cssLightblue',txt_lightblue);
    let lgToolbtns  = this.api.add.style('cssToolbtns', txt_lgToolbtns);
    let h50         = this.api.add.style('cssH50',      txt_h50);
    let blk         = this.api.add.style('cssBlk',      txt_blk);
    let track       = this.api.add.style('cssTrack',    txt_track);
    

    this.api.add.children(lgCaption,[lgTitle,lgClose]);
    this.api.add.children(lgShowbox,[lgText,lgHtml]);
    this.api.add.children(lgDisplay,[lgShowbox,lgToolbox,lgToolbar,lgToolbarCL]);
    this.api.add.children(lgCmd,[lgInput,lgEnter]);
    this.api.add.children(lgWind,[lgCaption,lgDisplay,lgCmd]);
    this.api.add.children(lgId,[lgIcon,lgWind]);
    this.api.add.children(lgClass,[lgCol,lgRow,dspFlex,dspChild,dspKeys,dspGson,lightblue,lgToolbtns,h50,blk,track]);
    this.api.add.children(lg,[lgId,lgClass]);
               fg.append(lg);
    document.head.append(fg);
    
    return this;
  }
  
  //#event
  event = {
    
    btns : {
      
      clear   : {
        click : ()=>{
          //if(this.idsp == -1){
            let text = document.getElementById('lgText');
                text.innerText = '';
          //}else{
            let html = document.getElementById('lgHtml');
                html.innerHTML = '';
          //}
          
        },
      },
      
      docu   : {
        click : ()=>{
          
          /*this.event.btns.clear.click();
          
          this.cmd.input('docu');
          */
          this.showDocu();
          
        },
      },
      
      dsp   : {
        click : ()=>{
          let text   = document.getElementById('lgText');
          let html   = document.getElementById('lgHtml');
          let btnDsp = document.getElementById('lgToolBtnDsp');
              
          this.idsp *= -1;
        
          if(this.idsp == 1){
            html.style.visibility = 'visible';
            text.style.visibility = 'hidden';
            btnDsp.innerText  = 'htm';
          } else {
            text.style.visibility = 'visible';
            html.style.visibility = 'hidden';
            btnDsp.innerText  = 'txt';
          }
          
          this.lastClickId = 'lgToolBtnDsp';
          
          return this.event;
        },
      },
      
      upload   : {
        click : ()=>{
          let text   = document.getElementById('lgText');
          let html   = document.getElementById('lgHtml');
          
          //$lg('7692::upload');
          
          let fcont = text.value;
          
          $lg('fcont.length',fcont.length);
          
          let m = fcont.match(/path\:([\w\.\/]+)/);
          let n = fcont.match(/name\:([\w\.\/]+)/);
          
          let fpath = m != null ? m[1] : null;
          
          let fname = n != null ? n[1] : null;
          
          if( m == null || n == null ) {
            $lg('Ajs::7704::upload fail::bgo');
            return;
          }
          
          let svr = `${fpath}/handler.php`;
          
          let op = 'file__save';
          let da = {
            name : fname,
            cont : fcont,
          }
          let xhr = new Xhr(svr);
              xhr.ask(op,da);
              xhr.rsp((rsp)=>{
                $lg('ajs::7718::bgg',JSON.stringify(rsp));
              },(rsp)=>{
                $lg('ajs::7720::bgo',JSON.stringify(rsp));
                
              })
          return this.event;
        },
      },
      
      topbar : {
          click : ()=>{
              let tb = this.api.gbid('lgTopbar');
              if(tb.style.visibility == 'hidden'){
                  if(this.lastClickId == 'lgToolBtnDsp')
                      this.topbar.add.searchBtn();
                      this.topbar.show();
              }else{
                  this.topbar.hide();
              }
              return this.event;
          }
      },
      
      char  : {
        click : ()=>{ 
          //$lg('6859::char::click::'+Log.now());
          let text   = document.getElementById('lgText');
          let html   = document.getElementById('lgHtml');
          let btnDsp = document.getElementById('lgToolBtnDsp');
          let btnChar = document.getElementById('lgToolBtnChar');
              
          this.idsp = 1;
          html.style.visibility = 'visible';
          text.style.visibility = 'hidden';
          btnDsp.innerText  = 'htm';
          
          this.progress.css.update(0.1).show();
          //return;
          let prepare = ()=>{
              return new Promise((res)=>{
          
                  let css = (()=>{
                      let content = `
                        .lgCharsetBox{
                            position        : relative;
                            display         : flex;
                            flex-direction  : column;
                            justify-content : flex-start;
                            align-items     : center;
                            padding         : 10px;
                            margin          : 6px;
                            width           : 96%;
                            height          : auto;
                            border-radius   : 10px;
                            background      : ${this.rgba.white(9,0.8)};
                        }
                        .lgCharsetName{
                            color           : ${this.rgba.white(1,0.8)};;
                            font-size       : 7vmin;
                        }
                        .lgCharsetSymBox{
                            position        : relative;
                            display         : flex;
                            flex-direction  : row;
                            flex-wrap       : wrap;
                            justify-content : flex-start;
                            align-items     : center;
                            padding         : 10px;
                            margin          : 6px;
                            width           : 96%;
                            height          : auto;
                            background      : ${this.rgba.white(6,0.8)};
                        }
                        .lgCharsetObj{
                            position        : relative;
                            display         : flex;
                            flex-direction  : column;
                            flex-wrap       : wrap;
                            justify-content : center;
                            align-items     : center;
                            padding         : 6px;
                            margin          : 6px;
                            width           : auto;
                            height          : auto;
                            border-radius   : 6px;
                            background      : ${this.rgba.white(3,0.8)};;
                           
                        }
                        .lgCharsetHex{
                            position        : relative;
                            display         : block;
                            padding         : 2px;
                            margin          : 3px;
                            background      : ${this.rgba.white(2,0.8)};
                            color           : black;
                            text-align      : center;
                            padding         : 3px;
                            border-radius   : 3px;
                            font-size       : 3vmin;
                        }
                        .lgCharsetSymb{
                            position        : relative;
                            display         : block;
                            padding         : 10px;
                            margin          : 6px;
                            background      : ${this.rgba.white(3,0.8)};;
                            color           : black;
                            text-align      : center;
                            padding-top     : 3px;
                            border-radius   : 6px;
                            font-size       : 7vmin;
                        }
                      `;
                  let sty   = this.api.add.style('cssLgCharsetList',content);
                  let cssLg = this.api.gbid('cssLg');
                      cssLg.appendChild(sty);
                  //$lg('css added');
                  })();
                  
                  let pack = (min,max,name)=>{
                      let callback = function(e){
                          //$lg('6910::span-hex:click');
                          //alert(e.target.innerText);
                          new Css().docu.exe.copy(e.target.innerText,true);
                      }
                      let eveArr = [{name:'onclick',callback:callback}];
                      let divBox = this.api.elm('div','','lgCharsetBox');
                      let spName = this.api.elm('span','','lgCharsetSymb lgCharsetName',name);
                      let br     = this.api.elm('br','','','');
                      let divSym = this.api.elm('div','','lgCharsetSymBox');
                      for(let hex = min; hex <= max; hex++){
                         let char = String.fromCharCode(hex);
                         let obj  = this.api.elm('div','','lgCharsetObj');
                         let spHex  = this.api.elm('span','','lgCharsetHex',`0x${hex.toString(16)}`,eveArr);
                         let symb = this.api.elm('span','','lgCharsetSymb',char);
                         obj.appendChild(spHex);
                         obj.appendChild(symb);
                         divSym.appendChild(obj);
                      }
                      divBox.appendChild(spName);
                      divBox.appendChild(divSym);
                      //divBox.appendChild(br);
                      return divBox;
                  }
                  
                  //show all the char
                  let fg = this.api.fg();
                  let char = new Char();
                 
                  let arr = Reflect.get(char,'utf8');
                  for(let a of arr){
                      //$lg(a[0],a[1],a[2]);
                      let min  = a[0];
                      let max  = a[1];
                      let name = a[2];
                      fg.appendChild(pack(min,max,name));
                  }
                  res(fg);
                  //$lg('6988::resolve',Log.now());
              })
          }
          
          prepare().then((fg)=>{
              html.innerHTML = '';
              html.appendChild(fg);
              //$lg('6996::lgHtml.appendChild done',Log.now());
              //let symbs = html.querySelectorAll('.lgCharsetSymb');
              //$lg('6998::all done',symbs.length,Log.now());
              
          })
          
          return this.event;
        },
      },
      
      icon  : {
        click : async ()=>{ 
          let text   = document.getElementById('lgText');
          let html   = document.getElementById('lgHtml');
          let btnDsp = document.getElementById('lgToolBtnDsp');
          let btnChar = document.getElementById('lgToolBtnChar');
              
          this.idsp = 1;
          html.style.visibility = 'visible';
          text.style.visibility = 'hidden';
          btnDsp.innerText  = 'htm';
          
          let css = (()=>{
              let content = `
                .lgCharsetBox{
                    position        : relative;
                    display         : flex;
                    flex-direction  : column;
                    justify-content : flex-start;
                    align-items     : center;
                    padding         : 10px;
                    margin          : 6px;
                    width           : 96%;
                    height          : auto;
                    border-radius   : 10px;
                    background      : ${this.rgba.white(9,0.8)};
                }
                .lgCharsetName{
                    color           : ${this.rgba.white(1,0.8)};;
                    font-size       : 7vmin;
                }
                .lgCharsetSymBox{
                    position        : relative;
                    display         : flex;
                    flex-direction  : row;
                    flex-wrap       : wrap;
                    justify-content : flex-start;
                    align-items     : center;
                    padding         : 10px;
                    margin          : 6px;
                    width           : 96%;
                    height          : auto;
                    background      : ${this.rgba.white(6,0.8)};
                }
                .lgCharsetObj{
                    position        : relative;
                    display         : flex;
                    flex-direction  : column;
                    flex-wrap       : wrap;
                    justify-content : center;
                    align-items     : center;
                    padding         : 6px;
                    margin          : 6px;
                    width           : auto;
                    height          : auto;
                    border-radius   : 6px;
                    background      : ${this.rgba.white(3,0.8)};;
                   
                }
                .lgCharsetHex{
                    position        : relative;
                    display         : block;
                    padding         : 2px;
                    margin          : 3px;
                    background      : ${this.rgba.white(2,0.8)};
                    color           : black;
                    text-align      : center;
                    padding         : 3px;
                    border-radius   : 3px;
                    font-size       : 3vmin;
                }
                .lgCharsetSymb{
                    position        : relative;
                    display         : block;
                    padding         : 10px;
                    margin          : 6px;
                    background      : ${this.rgba.white(3,0.8)};;
                    color           : black;
                    text-align      : center;
                    padding-top     : 3px;
                    border-radius   : 6px;
                    font-size       : 7vmin;
                }
                .f-size{
                    font-size       : 2.5rem;   
                }
                .iframe-bsp-icon{
                    width           : 100%;
                    height          : 100%;
                    
                }
              `;
          let sty   = this.api.add.style('cssLgCharsetList',content);
          let cssLg = this.api.gbid('cssLg');
              cssLg.appendChild(sty);
          //$lg('css added');
          })();
          
          let t3d = new Load('../import/thirdpart/');
            await t3d.bspIcon.load();
          
          let listAll = (()=>{
                let str = "areaChart,barChart,book,book,book,bookmarkEmpty,bookmarkEmpty,camera,chain,chain,clock,commentEmpty,creditCard,crop,crop,display,document,eye,file,flag,flag,folder,forbidden,frown,frown,headphone,heart,heart,heart,home,home,home,imac,imacBold,image,infinity,infinity,iphone,iphoneBold,keyboard,macbook,macbookBold,mail,mail,market,market,meh,meh,microphone,microphone,mouse,mouse,nexus,paperClip,paperClip,paperClip,piano,pin,pin,power,rename,ruler,search,signIn,signIn,signOut,signOut,smile,smile,stroke,sync,tag,tag,terminal,trash,user,user,video,volumeHigh,volumeHigh,volumeLow,volumeMedium,youtube,youtube"
                let arr = str.split(',');
                let uri = 'http://127.0.0.1:8080/project/import/thirdpart/bootstrap-icons/v1.8.3/font/index.html';
                let h = new Html();
                    h.dom('#lgHtml')
                      .iframe('iframe-bsp-icon').src(uri)
                      .ok();
          })();
        
          return this.event;
        },
      },
      
      sql   : {
        click : ()=>{ 
          this.toolbar.show();
          return this.event;
        },
      },
      
      jsBeauty   : {
        click : async ()=>{ 
          
          const mod = await import ('../thirdpart/others/jsbeautify.js');
          if( mod ){
            let input = document.getElementById('lgText').value;
          
            let output = mod.js_beautify(input);
            
            document.getElementById('lgText').value = output;
            //alert('all done');
          }else{
            alert('jsbeautify.js was not found');
          }
          
          return this.event;
        },
      },
      
      enter : {
          click : (e)=>{
            let str  = document.getElementById('lgIpt').value;
            //$lg('input:',str);
            this.cmd.input(str);
            
          }
      },
      
      mline : {
          click : (e)=>{
            let inp    = document.getElementById('lgIpt');
            let mline  = document.getElementById('lgbtnMline');
            
            if(inp.style.height == null || inp.style.height == '100%'){
                inp.style.height = '300px';
                inp.rows = '10';
                if(mline)
                    mline.innerText = String.fromCharCode(0x25bd);
            }else{
                inp.style.height = '100%';
                inp.rows = '1';
                if(mline)
                    mline.innerText = String.fromCharCode(0x25b2);
            }
            
          }
      },
      
      
      close : {
          click : ()=>{
              let wind = document.getElementById('lgWind');
              
              wind.style.visibility = 'hidden';
              wind.style.zIndex = '0';
             
              return this.event;
          },
      },
      
      toolbarCl : {
          click : ()=>{
              this.toolbar.hide();
              return this.event;
          },
      },
      
    },
    
    icon : {
        click : (e)=>{
          //alert('icon clicked');
          let wind = document.getElementById('lgWind');
          this.icc *= -1;
          
          if( wind.style.visibility == 'hidden') {
              wind.style.visibility = 'visible';
              wind.style.zIndex = '9000';
          }else {
              wind.style.visibility = 'hidden';
              wind.style.zIndex = '0';
              
          }
          return this.event;
        },
        touch : {
              x : 0,
              y : 0,
          start : (e)=>{
              e.stopPropagation();

            return this.event.icon.touch;
          },
          move : (e)=>{
            //
            e.stopPropagation();
            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;
            /*
            
            let xx = this.event.icon.touch.x - x;
            let yy = this.event.icon.touch.y - y;
            */
            //let icon = document.getElementById('lgIcon');
            let icon = e.target;
                icon.style.left = x+`px`;
                icon.style.top  = y+`px`;
            return this.event.icon.touch;
          },
          end : (e)=>{
              e.stopPropagation();
            //
            //let x = e.touches[0].clientX;
            //let y = e.touches[0].clientY;
            //
            return this.event.icon.touch;
          },
    },
        drag  : {
          x     : 0,
          y     : 0,
          start : (e)=>{
            e.preventDefault();
            
            
            return this.event.icon.drag;
          },
          move  : (e)=>{
            e.preventDefault();
            
            
            return this.event.icon.drag;
          },
          end   : (e)=>{
            e.preventDefault();
            
            return this.event.icon.drag;
          },
        },
    },
    
    setup : ()=>{
      let icon = document.getElementById('lgIcon');
          icon.addEventListener('click',this.event.icon.click,false);
          /*
          icon.setAttribute('draggable','true');
          icon.addEventListener('dragstart', this.event.icon.drag.start, false);
          icon.addEventListener('drag',  this.event.icon.drag.move,  false);
          icon.addEventListener('dragend', this.event.icon.drag.end,   false);
          */
          icon.addEventListener('touchstart', this.event.icon.touch.start, false);
          icon.addEventListener('touchmove',  this.event.icon.touch.move,  false);
          icon.addEventListener('touchend',   this.event.icon.touch.end,   false);
          
      let btnEnter = document.getElementById('lgbtnEnter');
          btnEnter.addEventListener('click',this.event.btns.enter.click,false);
         
      let btnMline = document.getElementById('lgbtnMline');
          btnMline.addEventListener('click',this.event.btns.mline.click,false);
         
      let btnClose = document.getElementById('lgClose');
          btnClose.addEventListener('click',this.event.btns.close.click,false);
      let btnTbCl = document.getElementById('lgToolbarClose');
          btnTbCl.addEventListener('click',this.event.btns.toolbarCl.click,false);
         
      let btnClear = document.getElementById('lgToolBtnClear');
          btnClear.addEventListener('click',this.event.btns.clear.click,false);
         
      let btnDsp = document.getElementById('lgToolBtnDsp');
          btnDsp.addEventListener('click',this.event.btns.dsp.click,false);
         
      let btnTopbar = document.getElementById('lgToolBtnTopbar');
          btnTopbar.addEventListener('click',this.event.btns.topbar.click,false);
         
      let btnChr = document.getElementById('lgToolBtnChar');
          btnChr.addEventListener('click',this.event.btns.char.click,false);
         
      let btnIcon = document.getElementById('lgToolBtnIcon');
          btnIcon.addEventListener('click',this.event.btns.icon.click,false);
         
      let btnSQL = document.getElementById('lgToolBtnSQL');
          btnSQL.addEventListener('click',this.event.btns.sql.click,false);
         
      let btnDocu = document.getElementById('lgToolBtnDocu');
          btnDocu.addEventListener('click',this.event.btns.docu.click,false);
         
      let toolbox = document.getElementById('lgToolbox');
          toolbox.addEventListener('click',function(e){
              if(e.target && e.target.nodeName == 'DIV'){
                  
              }
          },false);
         
      let toolUpload = document.getElementById('lgToolBtnTxtUpload');
          toolUpload.addEventListener('click',this.event.btns.upload.click,false);
         
      let jsBeauty = document.getElementById('lgToolBtnJsBeauty');
          jsBeauty.addEventListener('click',this.event.btns.jsBeauty.click,false);
         
          
      return this;
    },
    
    
    
  }
  
  //#toolbar
  toolbar = {
    
      lastClick : '',
      show  : ()=>{
          let toolbar   = document.getElementById('lgToolbar');
          let toolbarCl = document.getElementById('lgToolbarClose');
          toolbar.style.width = '160px';
          toolbarCl.style.display = 'block';
          return this;
      },
      hide  : ()=>{
          let toolbar = document.getElementById('lgToolbar');
          let toolbarCl = document.getElementById('lgToolbarClose');
              toolbar.style.width = '0px';
              toolbarCl.style.display = 'none';
          return this;
      },
      
  }
  
  topbar = {
    
      init  : ()=>{
          return this.topbar.css().html().hide();
      },
    
      html : ()=>{
          if(this.api.gbid('lgTopbar'))return this.topbar;
          let topbar = this.api.elm('div','lgTopbar');
              this.api.gbid('lgTitle').appendChild(topbar);
          return this.topbar;
      },
      
      css  : ()=>{
          if(this.api.gbid('cssLgTopbar'))return this.topbar;
         
          let cssText   = `
              #lgTopbar{
                  position        : relative;
                  display         : flex;
                  visibility      : hidden;
                  flex-direction  : row;
                  justify-content : center;
                  align-items     : center;
                  width           : 60%;
                  height          : 96%;
                  left            : 0px;
                  top             : 0px;
                  margin          : 6px;
                  padding         : 6px;
                  border          : 0px solid green;
                  border-radius   : 10px;
                  background      : ${this.rgba.get(this.color,9,1)};
                  color           : ${this.rgba.get(this.color,3,1)};
              }
              #lgTopbarInp{
                  position        : relative;
                  display         : block;
                  width           : 83%;
                  height          : 80%;
                  //left            : 0px;
                  //top             : 0px;
                  margin          : 6px;
                  font-size       : 4vmin;
                  padding         : 10px;
                  border-radius   : 10px;
                  border          : 0px solid red;
                  background      : ${this.rgba.get(this.color,6,1)};
                  color           : ${this.rgba.get(this.color,12,1)};
              }
              .log-hidden{
                  visibility      : hidden;
              }
          `;
          let cssTopbar = this.api.add.style('cssLgTopbar',cssText);
          this.api.gbid('cssLgCaption').appendChild(cssTopbar);
          return this.topbar;
      },
      
      add  : {
          
          searchBtn  : ()=>{
              let btn1  = this.api.elm('button','lgTopbarBtnSearch','lgToolbtns','search');
                  btn1.onclick = this.topbar.event.btns.search.click;
              let input = this.api.elm('input','lgTopbarInp');
  
              let topbar = this.api.gbid('lgTopbar');
                  topbar.innerHTML = '';
                  
                  topbar.appendChild(input);
                  topbar.appendChild(btn1);
              return this.topbar;
          },
          
      },
      
      event : {
          btns : {
              search : {
                  click : (e)=>{
                      let txt = this.api.gbid('lgTopbarInp').value;
                      
                      let num = txt.match(/^\d+$/i);
                      if(num){
                          let spans = this.api.gbid('lgHtml').querySelectorAll(`span[data-num]`);
                          //$lg('5739::spans.length',spans.length);
                          for(let span of spans){
                              let dnum = span.getAttribute('data-num');
                              if(dnum != num){
                                  //span.parentElement.style.visibility = 'hidden';
                                  span.classList.add('log-hidden');
                              }
                          }
                      }
                      if(txt == ''){
                          this.topbar.showAll();
                      }
                  },
              },
          },
      },
      
      show : ()=>{
          let titText = this.api.gbid('lgTitleText')
              titText.innerText = '';
          let topbar = this.api.gbid('lgTopbar')
              topbar.style.visibility = 'visible';
          return this.topbar;
      },
      
      hide : ()=>{
          let titText = this.api.gbid('lgTitleText')
              titText.innerText = 'Log';
          let topbar = this.api.gbid('lgTopbar')
              topbar.style.visibility = 'hidden';
          return this.topbar;
      },
      
      reset  : (txt = 'Log')=>{
          let titBar = this.api.gbid('lgTitle')
              titBar.innerHTML = txt;
          return this.topbar;
      },
    
      showAll : ()=>{
          let objs = this.api.gbid('lgHtml').querySelectorAll(`.log-hidden`);
          for(let obj of objs){
              obj.classList.remove('log-hidden');
          }
      },
    
  }
  
  
  //#pgs
  //#progress
  progress = {
    into   :   (anyStr,second)=>{
        let target = this.api.query(anyStr);
        if(target){
          this.progress.html(anyStr)
                       .css.add(second)
                       .event.setup();
          //$lg('7299::progress::done;',Log.now());
        }
        return this.progress;
    },
    show   :   ()=>{
        let pgbox = this.api.query('#lgProgressBox');
        if(pgbox){
          pgbox.style.display = 'flex';
          //
        }
        return this.progress;
    },
    hide   :   ()=>{
        let pgbox = this.api.query('#lgProgressBox');
        if(pgbox){
          pgbox.style.display = 'none';
          //
        }
        return this.progress;
    },
    html   :   (anyStr)=>{
        //
        let fgm    = this.api.fg();
        let pgs    = this.api.elm('div','','lgProgress');
        let pgsbox = this.api.elm('div','lgProgressBox');
            pgsbox.appendChild(pgs);
               fgm.appendChild(pgsbox);
        let elmObj = this.api.query(anyStr);
            elmObj.appendChild(fgm);
        return this.progress;
    },
    css    :   {
      add     :   (second='10',color=this.color)=>{
        let code = `
            #lgProgressBox{
                
                position        : fixed;
                display         : none;
                flex-direction  : row;
                justify-content : flex-start;
                align-items     : center;
                top             : 200px;
                left            : 100px;
                width           : 60%;
                height          : 60px;
                margin          : 0px;
                border-radius   : 10px;
                padding         : 6px;
                border          : 0px solid red;
                background      : ${this.rgba.get(this.color,10,1)};
                //z-index         : 9030;
            }
            .lgProgress{
                display         : block;
                width           : 50%;
                height          : 99%;
                border-radius   : 6px;
                text-align      : center;
                border          : 0px solid green;
                background      : ${this.rgba.get(color,2,1)};
                animation       : lgAniLoading ${second}s;
            }
            /*
            .lgProgress::after{
                content         : "50%";
                color           : black;
                font-size       : 5vmin;
            }*/
            @keyframes lgAniLoading{`;
        let j = 0;
        for(let i=0 ; i<=100; i+=10){
              j = i.toString().padStart(3,' ');
              code += `
                ${j}%{ width           : ${j}%;  
                       color           : black; 
                       font-size       : 5vmin;
                       ::after:content : "${j}%";
                   }\n`;
        }
        code += ' '.repeat(12) + `}`;
        let style = this.api.add.style('cssProgress',code);
        let find = this.api.query('cssProgress');
        if(find){
          document.head.removeChild(find);
        }
        this.api.query('#cssLg').appendChild(style);
        //
        return this.progress;
      },
      update  :   (second)=>{
          let pgs = this.api.query('.lgProgress');
              if(pgs == null) return this.progress;
              pgs.style.animation = `lgAniLoading ${second}s ease`;
          /*
          let code = style.innerHTML;
          let patt = new RegExp(/(lgAniLoading\s)\d+([\w\s]+)/);
              code.replace(patt,`$1${second}$2`);
          */
          return this.progress;
      },
    },
    remove :   ()=>{
        let pbox = this.api.query('#lgProgressBox');
        let sbox = this.api.query('#lgShowbox');
        if(pbox){
          sbox.removeChild(pbox);
        }
        return this.progress;
    },
    event : {
        setup : ()=>{
            let pgs = this.api.query('.lgProgress');
            pgs.addEventListener('animationend',(e)=>{
                this.progress.hide();
                $lg('7424::animationend',Log.now());
            });
            return this.progress;
        }
    }
  }
  
  
  //#now
  static now  = ()=>{
    let  d = new Date();
    let hh = d.getHours();
    let mm = d.getMinutes();
    let ss = d.getSeconds();
    let ms = d.getMilliseconds();
    return `${hh}:${mm}:${ss}:${ms.toString().padStart(4,'0')}`;
  }
  

  
  //#strify
  strify = {
    html : {
      frag :  (docFragObj)=>{
                
                let str = '';
                let hasChild  = docFragObj.hasChildNodes();
                if(hasChild){
                  let arr = docFragObj.childNodes;
                  for(let obj of arr){
                    str += this.strify.html.tree(obj);
                  }
                }
                //
                return str;
              },
      one  :  (htmlElementObject,space=4)=>{
                let object    = htmlElementObject;
                //
                let attrs     = object.attributes;
                let text      = object.innerText;
                //let type = object.nodeType;
                let tag       = object.tagName.toLowerCase();
                
                let str       = ' '.repeat(space) + '<'+tag;
                for(let key of Reflect.ownKeys(attrs)){
                  
                  if(parseInt(key)||parseInt(key)===0){
                    continue;
                  }
                  
                  let val = object.attributes.getNamedItem(key).value;
                  
                  str += ` ${key}='${val}'`;
                  
                }
                str += '>'+ text + '</'+tag+'>\n';
                return str;
              },
      tree :  (object,space=4)=>{
                //let object    = htmlElementObject;
                
                let type      = object.nodeType;
                let tag       = object.nodeName.toLowerCase();
                let hasChild  = object.hasChildNodes();
                let str       = this.strify.html.one(object,space);

                if(hasChild){
                  let children  = object.children;
                  for(let child of children){
                  //let nn = child.nodeName;
                  //let nt = child.nodeType;
                  //str += this.strify.html.one(child,space);
                  
                    str += this.strify.html.tree(child,space+4);
                  }
                }
                //str += ' '.repeat(space) + '</'+tag+'>\n';
                return str;
              },
    },
    object  : (obj,space=2)=>{
                return this.listKeys(obj,space);
              },
  }
 
  
  //#tree
  tree(htmlobj){
    let str = this.strify.html.tree(htmlobj,4);
    this.lgg(str);
    return str;
  }
  
  //#fgm
  fgm(fg){
    //let fg = Test.frag();
    let str = this.strify.html.frag(fg);
    this.lgg(str);
  }
  
  //#fgs
  fgs = (frags)=>{
    //
    let str = '';
    for(let f of frags){
      let top = f.top;
      //
      let frg = f.frag;
      
      str += '\n' + this.strify.html.frag(frg);
    }
    return str;
  }
  
  //#html
  html = {
    wrapArray : (obj)=>{
      
      let i = 0;
      let h = document.body.querySelector('#lgHtml');
      
      let fg = document.createDocumentFragment();
      let top = undefined;
      let idx = obj.idx * 10000;
      let id  = idx;
      
      let topClick = (e)=>{
          e.preventDefault();
          e.stopPropagation();
          this.itop *= -1;
          let id   = e.target.id;
          let slt = `#${id} .dspChild`;
          //
          let children = document.querySelectorAll(slt);
          //
          if(this.itop == -1){
              for(let c of children){
                  c.style.display = 'none';
              }
          }else{
              for(let c of children){
                  c.style.display = 'flex';
              }
          }
      }
      let clk = (e)=>{
          e.preventDefault();
          e.stopPropagation();
          let span = e.target;
          let id   = span.id;
          let text = span.innerText;
          //let p = document.getElementById(id);
          let gp = span.parentElement.parentElement;
          
          
          let cmd  = gp.getAttribute('data-cmd');
              cmd  = `${cmd}.${text}`;
              
          let arr = eval(`this.listKeys(${cmd},'arr')`);
          let fg2 = document.createDocumentFragment();
          let p2 = span.parentElement;
          if(this.lastClickId !== '' && p2.id !== this.lastClickId)
          {
            this.api.style(this.lastClickId,'height','60px');
          }   
          p2.style.height = 'auto';
          this.lastClickId = p2.id;
          let pid = p2.id.replace('dspChild_','');
          let gid = 0;
          this.api.hide('.dspGson');
          
          for(let a of arr){
              gid++;
              let div = this.api.elm('div','dspChild_'+pid+'_'+gid,'dspChild dspGson dspFlex');
              let span = this.api.elm('span','dspKey_'+pid+'_'+gid,'dspKeys lightblue');
                  span.onclick = clk;
                  span.innerText = a.replace(/\"/g,'');
              div.appendChild(span);
              fg2.appendChild(div);
          }
          
          p2.appendChild(fg2);
          
          
          
          
          
          this.log(id,cmd);
      }

      for(let a of obj.child){
          if(i == 0){
              top = this.api.elm('div','dspTop_'+idx,'dspTop');
              top.innerText = obj.top;
              top.onclick = topClick;
              top.setAttribute('data-cmd',obj.top);
              top.setAttribute('data-idx',obj.idx);
              fg.appendChild(top);
          }else{
              id++;
              //let div = this.api.elm('div','dspChild_'+id,'dspChild');
              let span = this.api.elm('div','dspKey_'+id,'dspChild');
                  span.onclick = clk;
                  span.innerText = a.replace(/\"/g,'');
              //div.appendChild(span);
              //top.appendChild(div);
              fg.appendChild(span);
          }
          i++;
      }
      
      //fg.appendChild(top);
      h.appendChild(fg);
      
    },
  }
  
  showDocu(){
    
    let fgm = this.api.fg();
    
    let clk = (e)=>{
      e.stopPropagation();
      let ds = e.target;
      let p = ds.parentElement;
      
      if(ds.classList.contains('title')){
        
        let c = p.querySelector('.item > .child');
        
          if(c.classList.contains('hide')){
            c.classList.remove('hide');
            c.classList.add('flex');
          }else if(c.classList.contains('flex')){
            c.classList.remove('flex');
            c.classList.add('hide'); 
          }

      }
    
    }
    
    let scan  = (ElmObj,box)=>{
        let str = '';
        let attrs     = ElmObj.attributes;
        let text      = ElmObj.innerText;
        let tag       = ElmObj.tagName.toLowerCase();
        str += `${tag}(`;
        for(let key of Reflect.ownKeys(attrs)){
          if(parseInt(key) === 0 || parseInt(key)===0){
            continue;
          }
          let obj = ElmObj.attributes.getNamedItem(key);
          let val = obj == null ? null :  obj.value;
          if(val)str += ` ${key}='${val}'`;
        }
        str += ` )`;
        /*let li   = this.api.elm('div','','list','');
            li.onclick = clk;*/

        let item = this.api.elm('div','','item flex','');
            item.addEventListener('click',clk,0);
        
        let tit = this.api.elm('span','','title',str);
            tit.addEventListener('click',clk,0);
        
        item.appendChild(tit);
        
        let chd = null;
        if(ElmObj.childElementCount > 0){
          chd = this.api.elm('div','','child hide','');
          chd.addEventListener('click',clk,0);
          for(let child of ElmObj.children){
            scan(child,chd);
          }
        }
        
        if(chd){
          tit.classList.add('bdr')
          item.appendChild(tit);
          item.appendChild(chd);
        }
        
        //box.appendChild(span);
        box.appendChild(item);
              
    }
    
    let elmHtml = document.documentElement;
    
    scan(elmHtml,fgm);
    
    let lgHtml = this.api.gbid('lgHtml');
        lgHtml.innerText = '';
        lgHtml.appendChild(fgm);
    
  }
  
  
  //#listKeys
  listKeys = (obj,format='str',space=2)=>{

    let isCapital = (str)=>{
         if( str.match(/^[A-Z]/g )) return true;
         return false;
    }
    
    
    let out = format =='str' ? '' : [];
    
    
    for(let key of Reflect.ownKeys(obj)){
      
      
      
      //let desc = Reflect.getOwnPropertyDescriptor(obj,key);
      
      
      
      let blackList = ['Function','undefined'];
      if( blackList.includes(key)){
        //$lg('blackList key:' + key);
        continue;
      }
      if(isCapital(key)==false){
        //continue;   
      }
      
      if(format == 'str'){
        out += ' '.repeat(space) + key + '\n'
      }else if(format == 'arr'){
        out.push(key);
      }
      
      
      
    };
    
    
    return out;
  }
  
  //#cmd
  cmd = {
      input : (str)=>{
                  let p = /^\s*(\w+)\(*([a-zA-Z\.\d\$]*)\)*/i;
                  let rst = str.match(p);
                  if(rst != null)
                    this.cmd.exec(rst);
              },
      exec  : (arr)=>{
                  if(arr == null) alert('unknow command');
                  this.execTimes++;
                  let text = document.getElementById('lgText');
                  let c = arr[1];
                  if( c == 'clr' ){
                    
                    this.event.btns.clr.click();
                  }else if( c == 'docu' ){
                      //text.innerText = document.documentElement.innerHTML;
                      //let str = this.strify.html.tree(document.documentElement);
                      //this.lgg(str);
                      let dsp = this.api.query('#lgToolBtnDsp').innerText;
                      if(dsp == 'txt'){
                          text.innerText = '';
                          text.style.whiteSpace = 'pre';
                          //let str = document.documentElement.innerHTML;
                          //str = str.replace(/(\<[.\w\s\.]+\>[.\w\.\s]*\<\/[\w]*\>)/ig,'$1\n');
                          //str = str.replace(/\>/ig,'>\n');
                          let obj = document.documentElement;
                          let str = this.strify.html.tree(document.body);
                              
                          this.lgg(str);
                      }else{
                        
                      }
                      
                  }else if( c == 'f' ){
                    
                  }else if( c == 'now' ){
                    $lg(Log.now());
                    
                  }else if( c == 'keys' ){
                    text.innerHTML = '';
                    try{
                      let cmd = `this.listKeys(${arr[2]})`;
                      let str = eval(cmd);
                      this.lgg(str);
                    }catch(err){
                      alert(err.message);
                    }
                    
                  }else if( c == 't' ){
                    let str = this.strify.html.tree(document.body);
                    this.lgg(str);
        
                  }else if( c == 'tw' ){
                    //eval("this.cmd(['fgm'])");
                    
                    let str = this.strify.object(window);
                    this.lgg(str);
                    
                  }else if( c == 'lg' ){
                      //alert(arr[0]);
                      try{
                        let cmd = `$${arr[0]}`;
                        eval(cmd);
                      }catch(err){
                        alert('Log::exec:3824:\n'+err.message+'\n'+'your input:\n'+arr[0]);
                      }
                  }else if( c == 'ta' ){
                    //eval("this.cmd(['fgm'])");
                    let arr = Test.arr();
                    //$lg(arr);
                  }else{
                    
                    let ___ = `${'-'.repeat(40)}\n`;
                    text.innerHTML = '';
                    let out = undefined;
                    let cmd = undefined;
                    
                    if(this.idsp == -1){
                      try{
                        cmd = `this.listKeys(${arr[0]})`;
                        out = '';
                        out = eval(cmd);
                        out = ___ + arr[0] + ':\n' + ___ + out;
                        this.lgg(out);
                      }catch(err){
                        alert(err.message);
                      }
                    }else{
                      try{
                        cmd = `this.listKeys(${arr[0]},'arr')`;
                        out = [];
                        out = eval(cmd);
                        let obj = {
                          idx : this.execTimes,
                          top : arr[0],
                          child : out,
                        }
                        this.html.wrapArray(obj);
                      }catch(err){
                        alert(err.message);
                      }
                    }
                  }
                  return this;
              },
  }
  
  //#objType
  objType(obj){
      let rst = [];
      try{
          let typeList = this.listKeys(window,'arr');
          //
          if(typeList == null)alert('Log::objType>error');
          
          for(let t of typeList){
              if(t == null)continue;
              //
              let pt = undefined;
                  //pt = Reflect.getPrototypeOf(`window.${t}`);
                  pt = Reflect.get(window,t);
              let desc = Reflect.getOwnPropertyDescriptor(window,t);
              //
              if(typeof(pt) !== 'object')continue;
              //if( eval(`obj instanceof ${t}`) ){
              if( obj instanceof pt ){
                  //return `${t}`;
                  //
                  //
                  
                  rst.push(t);
              }
          }
          return rst;
      }catch(err){
          alert(`Log::objType>err:\n${err.message}`);
      }
      return rst;
  }
   
  //#type
  type(obj){
      const arr = ['undefined','function','symbol','NaN','boolean','object','array','number','string','null'];
      let rst = undefined;
      let item = arr.pop();
      const ask = () =>{
          item = arr.pop();
          
          rst = typeof(obj) == item ? item : 
                    item == undefined ? undefined : ask(); 
          return rst;
      }
      try{
          rst = Array.isArray(obj) ? 'array' : 
                    typeof(obj) == item ? item : 
                        ask() ;
          return rst;
      }catch(err){
          alert('7856::Log::type>error:\n'+err.message);
          return 'error';
      }
  }
  
  
  copyArrayNoSymbol(input){
    let hadSymbol = 0;
    let arr = [];
    for(let a of input){
        if(typeof(a) === 'symbol'){
            hadSymbol = 1;
            arr.push('symbolValue');
        }else if(Array.isArray(a)){
            arr.push(this.copyArrayNoSymbol(a));
        
        }else{
          arr.push(a);
        }
    }
    return arr;
  }
  
  
  //#isHtmlObj
  isHtmlObj(obj){
      let str = `${obj}`;
      let a = str.includes('HTML');
      let b = str.includes('Document');
      let c = str.includes('Element');
      return ( a || b || c );
  }
  
  //#open
  open = {
      array : (arr,space=0)=>{
          
          return `${JSON.stringify(arr)}\n`;
          
      },
      object : (obj,space=0)=>{
          
          
          return `${obj}\n`;
      },
      string : (str,space=0)=>{
          return `'${str}'\n`;
              
      },
      number : (num,space=0)=>{
          return `${num}\n`;
              
      },
      boolean : (obj,space=0)=>{
          return `${JSON.stringify(obj)}\n`;
              
      },
      'function' : (obj,space=0)=>{
          return `${JSON.stringify(obj)}\n`;
              
      },
      'undefined' : (obj,space=0)=>{
          return `${JSON.stringify(obj)}\n`;
              
      },
      'null' : (obj,space=0)=>{
          return `${JSON.stringify(obj)}\n`;
              
      },
      symbol : (obj,space=0)=>{
          return `${JSON.stringify(obj)}\n`;
              
      },
      error : (obj,space=0)=>{
          return `${JSON.stringify(obj)}\n`;
              
      },
  }
  
  hack = (lineNum,obj)=>{
    
        let ts = ['function','object'];
        let name = '';
        //$lg('130::Ajs.type(obj)',Ajs.type(obj));
        if(typeof obj === 'string'){
            name = obj;
            obj  = Reflect.get(window,obj);
        }else if( ts.includes(Ajs.type(obj)) ){
            name = Reflect.get(obj,'name');
            //$lg('137::name',name);
        }
        if(obj == 'undefined') return;
        
        let arr = Reflect.ownKeys(obj);
        
        let keys = [];
        for(let a of arr){
          if(typeof a === 'symbol')continue;
          keys.push(a);
        }
        $lg('::bug',name,`${lineNum}::${name}.keys`,...keys);
  }
  
  //#lgg
  lgg(...args){
    let text = document.getElementById('lgText');
    let txt = '';
    for(let a of args){
      txt += a + `\n`;
    }
    text.innerHTML += txt;
    return this;
  }
  
  //#log
  log = (...args)=>{
    //try{
      if(this.debugMode == 0)return this;
      
      const stackTrace = new Error().stack;
      
      
      let last = args[args.length-1];
      let t = typeof(last);
      if( t == 'string' && last == '::lgg'){
          args.pop();
          return this.lgg(...args);
      }
      if( t == 'string' && last == '::htm'){
          this.mode = 'htm';
      }
      if(this.mode == 'htm'){
          return this.lgh.log(stackTrace,...args);
      }
      
      let text = document.getElementById('lgText');
      let txt = '';
      let i = 0;
      let tips = (i,type,input)=>{
          
          if(this.type(input) === "symbol"){
              type = type.padEnd(8," ");
              return `[${i}]:${type}=>can't not show symbol\n`;
          
          }else if(type === 'array'){
              //array contain symbol
              let hadSymbol = 0;
              let arr = [];
              for(let a of input){
                  if(this.type(a) === 'symbol'){
                      hadSymbol = 1;
                      arr.push('symbolValue');
                  }else{
                    arr.push(a);
                  }
              }
           
              if(hadSymbol) return `[${i}]:${type}=>${arr}\n`;
              else return `[${i}]:${type}=>${input}\n`;
          }else{
              type = type.padEnd(8," ");
              input = this.type(input)=='symbol' ? 'symbolValue' : input;
              return `[${i}]:${type}=>${input}\n`;
          }
      }
      for(let a of args){
          
          let type = this.type(a);
          $lg('8238::type::bgb',type);
          //let rst = (Reflect.get(this.open,type))(type);
          txt += tips(i,type,a);
          
          i++;
      }
      txt += `${'-'.repeat(40)}\n`;
      text.innerHTML += txt ;
    //}catch(err){
      //$lg('8248::bgo',err.message);
      //return this;
    //}
  }
  
  
    
  
  lgh = {
      
      debug_click : (e)=>{
          let obj = e.target;
          let name = obj.getAttribute('data-ajs-name');
          if(name)$lg(name);
      },
      ul : (arr, clArr = null)=>{
          let ule = this.api.elm('ul');
          for(let a of arr){
              let cl = clArr == null ? '' : clArr.join(' ');
              let e = this.api.elm('li','', cl ,a);
              ule.appendChild(e);
          }
          return ule;
      },
      colorize : (a)=>{
          let [c,bg] = ['',''];
          let list = {
              b   : 'blue',
              g   : 'green',
              r   : 'red',
              o   : 'orange',
              y   : 'yellow',
              bgb : 'blue',
              bgg : 'green',
              bgo : 'orange',
              bgy : 'yellow',
          }
          let change = (mark,where='')=>{
              let name = Reflect.get(list,mark);
              return `log-htm${where}-${name}`;
          }
          if(a != null){
              let keys = Reflect.ownKeys(list);
              for(let key of keys){
                  //if(a.toString().endsWith(`::${key}`))c = 'log-htm-red';
                  if(a.toString().endsWith(`::${key}`)){
                      if(key.length == 3 ) bg = change(key,'-bg');
                      if(key.length == 1 ) c  = change(key);
                      a = a.toString().replace(/\:{2}bg[a-z]\b/ig,'');  
                      a = a.replace(/\:{2}[a-z]\b/ig,''); 
                      break;
                  }
              }
          }
          return {a,c,bg};
      },
      item  : (...args)=>{
          let i = -1;
          let debug = 0;
          let fg  = this.api.fg();
          let color = '';
          let last = args[args.length-1];
          let f1 = args[0];
          let f2 = args[1];
          if( f1 == '::red') color = 'log-htm-red';
          if( f1 == '::bug') debug = 1;
          
          let div  = this.api.elm('ul','',`log-htm-item ${color}`,'');
              if(debug){ 
                  div.onclick = this.lgh.debug_click;
                  div.setAttribute('data-ajs-name',f2);
              }
          let args2 = this.copyArrayNoSymbol(args);
          
          let elmArr = [];
          for(let a of args2){
              if( a == null ) continue;
              i++;
              if(debug && i < 2 ) continue;
              if(typeof(a)=='symbol')continue;
              if(a == '::red' || a == undefined)continue;
              let [c,bg] = ['',''];
              if(a != null){
                  c  = this.lgh.colorize(a).c;
                  bg = this.lgh.colorize(a).bg;
                  a  = this.lgh.colorize(a).a;
              }
              let trackClazz = i == 0 ? 'lgTrackInfo' : '';
              let num = a.toString().match(/^\d{1,5}/i);
              let hsl = a.toString().match(/^(hsl\(\d{1,3},[\d\.]+%,[\d\.]+%\))(.*)/i);
              let rgba = a.toString().match(/^(rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*[\d\.]+\s*\))(.*)/i);
              let span = this.api.elm('li','',`log-htm-txt ${trackClazz} ${c} ${color} ${bg}`,a);
              if(num) span.setAttribute('data-num',num);
              if(hsl) { span.setAttribute('style',`background:${hsl[1]};`);
                        span.innerHTML = hsl[2];}
              if(rgba) { span.setAttribute('style',`background:${rgba[1]};`);
                         span.innerHTML = rgba[2];}
              if(debug){ 
                  span.onclick = this.lgh.debug_click;
                  span.setAttribute('data-ajs-name',f2+'.'+a);
              }
              //div.appendChild(span);
              elmArr.push(span);
          }
          div.append(...elmArr);
          fg.append(div);
          
          //let s = this.strify.html.frag(fg);
          //this.lgg(s);
          return fg;
      },
      log   : (stackTrace,...args)=>{
          /*
          const caller = stackTrace != null ? (stackTrace.split('\n')[2]).toString().trim().split(' ')[0] : null;
          const mod    = stackTrace != null ? (stackTrace.split('\n')[3]).toString().trim().split(' ')[1].slice(0, -3) : null;
          const line   = stackTrace != null ? (stackTrace.split('\n')[2]).toString().match(/:(\d+):\d+/)[1] : null;
          */  
          let stack = stackTrace != null ? stackTrace : '';

          let lgHtml = document.getElementById('lgHtml');
          
              //lgHtml.append(this.lgh.item(caller,mod,line,...args));
              lgHtml.append(this.lgh.item(stack,...args));
          
      },
  
  }

  
}


//@recd
export class Rec{

  constructor(){
    $lg('9238::Rec::bgo');
    this.stream = undefined; //stream from getUserMedia()
    this.recorder  = undefined; //MediaRecorder object
    this.chunks    = []; //Array of chunks of audio data from the browser
    this.ext = 'ogg';
    this.context    = null;
    this.microphone = null; //媒体流音频源
    this.processor  = null;
    this.mp3man = new Webman();
  }

  reset = ()=>{
    this.stream = undefined; //stream from getUserMedia()
    this.recorder  = undefined; //MediaRecorder object
    this.chunks    = []; //Array of chunks of audio data from the browser
    this.ext = 'ogg';
    this.context    = null;
    this.microphone = null; //媒体流音频源
    this.processor  = null;
  }

  callback = (stream)=>{
    
      $lg("getUserMedia() success, stream created, initializing MediaRecorder");

      /*  assign to gumStream for later use  */
      this.stream = stream;

      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          this.ext = "webm";
      } else {
          this.ext = "ogg"
      }

      //extension="ogg";


      let options = {
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 128000,

          mimeType: 'audio/' + this.ext + ';codecs=opus'
      }

      //bitsPerSecond:        128000,
      //update the format
      //document.getElementById("formats").innerHTML='Sample rate: 48kHz, MIME: audio/'+extension+';codecs=opus';

      /*
          Create the MediaRecorder object
      */
      this.recorder = new MediaRecorder(stream, options);
      
      this.context = new AudioContext(),
      this.microphone = context.createMediaStreamSource(stream), //媒体流音频源
      this.processor  = context.createScriptProcessor(16384,1,1), //js音频处理器
                 
      this.processor.onaudioprocess = function(event){
          //监听音频录制过程
          let array = event.inputBuffer.getChannelData(0);
          realTimeWorker.postMessage({ cmd: 'encode', buf: array });
      };         
                 
      //when data becomes available add it to our attay of audio data
      this.recorder.ondataavailable = (e)=>{
          //$lg("recorder.ondataavailable:" + e.data);
          //$lg("recorder.audioBitsPerSecond:" + this.recorder.audioBitsPerSecond);
          //$lg("recorder.videoBitsPerSecond:" + this.recorder.videoBitsPerSecond);
          //$lg ("recorder.bitsPerSecond:"+recorder.bitsPerSecond);
          // add stream data to chunks
          this.chunks.push(e.data);
          // if recorder is 'inactive' then recording has finished
          if (this.recorder.state === 'inactive') {
              // convert stream data chunks to a 'webm' audio format as a blob
              //const blob = new Blob(this.chunks, { t: 'audio/' + this.ext, bitsPerSecond: 128000 });
              //this.showUrl(blob);
          }
      };

      this.recorder.onerror = (e)=>{
          $lg(e.error);
          //add_div_pop(e.error);
      };

      //start recording using 1 second chunks
      //Chrome and Firefox will record one long chunk if you do not specify the chunck length
      this.recorder.start(1000);

                  //recorder.start();
  }

  start = ()=>{
    $lg("9307::start");

    this.reset();
    //add_div_pop(extension);

    /*
        Simple constraints object, for more advanced audio features see
        https://addpipe.com/blog/audio-constraints-getusermedia/
    */

    //let constraints = { audio: true }

    /*
       Disable the record button until we get a success or fail from getUserMedia()
   */

    /*
        We're using the standard promise based getUserMedia()
        https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    */

    navigator .mediaDevices
              .getUserMedia({ audio: true })
              .then(this.callback)
              .catch((err)=>{
              });
  }           

  getBlob = ()=>{
    this.recorder.stop();

    //stop microphone access
    this.stream.getAudioTracks()[0].stop();
    
    let blob = new Blob(this.chunks, { t: 'audio/'+this.ext, bitsPerSecond:128000});
    
    
    
    return blob;
     
  }

  stop = ()=>{
    $lg("9336::stop");
    
    this.recorder.stop();

    //stop microphone access
    this.stream.getAudioTracks()[0].stop();

    const blob = new Blob(this.chunks, { t: 'audio/'+this.ext, bitsPerSecond:128000});
    this.showUrl(blob);
    return blob;
  }

  showUrl = (blob)=>{

    var url = URL.createObjectURL(blob);
    var aud = document.createElement('audio');
    var li  = document.createElement('li');
    var link = document.createElement('a');

    //add controls to the <audio> element
    aud.controls = true;
    aud.src = url;

    //link the a element to the blob
    link.href = url;
    link.filename = new Date().toISOString() + '.' + this.ext;
    link.innerHTML = link.filename;

    //add the new audio and a elements to the li element
    li.appendChild(aud);
    li.appendChild(link);

    //add the li element to the ordered list
    //recordingsList.appendChild(li);

    document.body.append(li);

  }
  
  mp3worker = {
    
    init : ()=>{
      
    },
    
    fn : `
    
    
    
    `
    
  }
  

}

//@char
export class Char{
    
    utf8 = [
        [0x25A0,0x25FF,'Geometric Shapes'],
        [0x2600,0x26FF,'Miscellaneous Symbols'],
        [0x2700,0x27BF,'Dingbats'],
        [0x2000,0x206F,'General Punctuation'],
        [0x20A0,0x20CF,'Currency Symbols'],
        [0x2100,0x214F,'Letterlike Symbols'],
        [0x2200,0x22FF,'Math Symbols'],
        [0x2500,0x257F,'Box Drawings'],
        [0x2580,0x259F,'Block Elements'],
        [0x2190,0x21ff,'Arrows'],
        [0x0370,0x03ff,'Greek and Coptic'],
        [0x0080,0x00FF,'C1 Controls'],
        
    ]
    
    icon = {
        copy        : 0x2750,
        cut         : 0x2702,
        close       : 0x2716,
        music       : 0x266c,
        loop1       : 0x2673,
        play1       : 0x2023,
        rec         : 0x2588,
        'alert'     : 0x26a0,
        conf1       : 0x2699,
        conf2       : 0x2638,
        squ_empty   : 0x2610,
        squ_right   : 0x2611,
        squ_wrong   : 0x2612,
        menu1       : 0x2630,
        menu2       : 0x2263,
        star5       : 0x26e4,
        star_empty  : 0x2606,
        star_solid  : 0x2605,
        squ_empty   : 0x25fb,
        squ_solid   : 0x25fc,
    }
    
}

//webman
//#webworker
/*
  need Webman.php
  
  usage:
  let cont = `
      //this is a js file content;
      function helloWorld(){
          postmessage('hello-world');
          return;
      }
  `;
  let callbackErr = ()=>{
      ...
  }
  let callbackMsg = ()=>{
    
  }
  let man = new Webman();
      man.conf.file('handler.js')
              .text(cont)
              .addr('../php/webman.php');
      man.handle.msg(callbackMsg)
                .err(callbackErr);
      man.start();
  
*/
/*
export class Webman{
  
    constructor(){
        this.man         = undefined;
        this.addr        = undefined;
        this.output      = undefined;
        this.useJsFile   = undefined;
        this.input       = undefined;
        this.msgCallback = undefined;
        this.errCallback = undefined;
        this.rdyCallback = undefined;
        
    }
    
    conf = {
        php : {
            in  : (filename)=>{
                this.input = filename;
                return this.conf.php;
            },
            out : (filename)=>{
                this.output = filename;
                return this.conf;
            },
            cf     : ()=>{ return this.conf; },
        },
        use : (str)=>{
            this.useJsFile = str;
            return this.conf;
        },
        addr : (str)=>{
            this.addr = str;
            return this.conf;
        },
        ds : ()=>{  return this;  }
    }
    
    handle = {
      msg : (callback)=>{
          this.msgCallback = callback;
          return this.handle;
      },
    
      err : (callback)=>{
          this.errCallback = callback;
          return this.handle;
      },
      
      rdy : (callback)=>{
          this.rdyCallback = callback;
          return this.handle;
      },
      
      ds : ()=>{  return this;  }
      
    }
    
    post(dat){
        if(typeof(this.man) !== "undefined") 
            this.man.postMessage(dat);
        return this;
    }
    
    
    async start(){
        //$lg('8832::start',this.useJsFile);
        if(typeof(Worker) === "undefined") {
            alert('not supported WebWorker');
            return;
        }
        
        if(this.msgCallback === undefined) {
            alert('run "handle" first');
            return;
        }
        if(this.errCallback === undefined) {
            alert('run "handle" first');
            return;
        }
        
        await this.jsFromText();
          //$lg(`8848::file:'${this.useJsFile}' is ready::bgg`);
        if( this.man === undefined) {
            this.man = new Worker(this.useJsFile);
            //$lg('8275::this.useJsFile',this.useJsFile);
        }
        
        this.man.onmessage = this.msgCallback;
        this.man.onerror   = this.errCallback;
        
        if(this.rdyCallback){
            this.rdyCallback();
        }
        //$lg('8865::webman::start::all done',Log.now());
        return this;
        
    }
    
    stop(){
        this.man.terminate();
        this.man = undefined;
    }
    
    reset(){
        this.man         = undefined;
        this.useJsFile   = undefined;
        this.input       = undefined;
        this.output      = undefined;
        this.addr        = undefined;
        this.msgCallback = undefined;
        this.errCallback = undefined;
        return this;
    }
    
    jsFromText(){
        //$lg('8887::jsFromText');
        return new Promise((res,rej)=>{
            if(this.output=== undefined) {
                alert('run "conf" first');
                rej();
                return;
            }
            
            if(this.input === undefined) {
                alert('run "conf" first');
               rej();
               return;
            }
            this.fileIsExists(this.output).then((rst)=>{
              //$lg('8901::rst',rst);
              if(rst == true){
                res();
              }else{
                let dat = {
                    file  : this.output,
                    cont  : this.input,
                }
    
                let xhr = new Xhr(this.addr);
                    xhr.ask('Webman__make_js_file',dat);
                    xhr.rsp((data)=>{
                        //
                        //$lg('8914',data);
                        let obj = JSON.parse(data);
                        //
                        if(obj.da.rst == 1) {
                          //
                            res();
                        }else{
                            rej();
                        }
                    },(err)=>{
                        $lg('8340::err',err.message);
                        rej();
                    })
              }
              
            })
             
        })
    }
    
    fileIsExists(fname){
      //$lg('8935::fileIsExists');
      return new Promise((res,rej)=>{
      
        let xhr = new Xhr(this.addr);
            xhr.ask('file__exists',{fname});
            xhr.rsp((data)=>{
              //$lg('8941::data',data);
              let dat = JSON.parse(data);
              let rst = dat.da.rst;
              //$lg('8935::rst::bgg',rst);
              res(rst);
              
            },(err)=>{
              $lg('9128::webman::err::bgo',err);
              $lg('9128::webman::fname::bgo',fname);
              rej(err);
            })
          
      })
    }
    
}
*/
export class Webman{
  
  constructor(fn){
    
    this.script = fn;
    //this.workerCode = `(${fn.toString()})()`;
    
    this.onmessage = null;
    this.onerror   = null;
    
    this.worker = null;
    
  }
  
  start(){
    
    return new Promise((ok,fail)=>{
      // 获取函数的源代码形式
      const workerCode = `(${this.script.toString()})()`;
      
      // 创建Blob对象
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      
      // 生成可执行的URL
      const workerUrl = URL.createObjectURL(blob);
      
      // 创建一个新的web worker
      this.worker = new Worker(workerUrl);
      
      this.worker.onmessage = this.onmessage;
      this.worker.onerror   = this.onerror;
      
      /*
      // 发送消息给web worker
      worker.postMessage('Hello from main thread!');
      
      
      // 监听web worker发送的消息
      worker.addEventListener('message', (event) => {
        const data = event.data;
        console.log('Received message from worker:', data);
      });
      */
      
      // 在使用完Blob对象和URL之后，记得释放资源
      URL.revokeObjectURL(workerUrl);
      
      //$lg('webman2 is ready');
      
      ok();
      
      
      /*
      // 动态生成一个script标签，并将web worker的代码写入其中
      const script = document.createElement('script');
            script.type = 'text/javascript';
            script.textContent = workerCode;
            script.onload = ()=>{ ok() };
      // 将script标签插入到DOM中
      document.head.append(script);
      */
    })
    
  }
  
  
    
  post(dat){
      if(typeof(this.worker) !== "undefined") 
          this.worker.postMessage(dat);
      return this;
  }
    
  
  
}

export class Sqlike{
  
      constructor(addr){
          //$lg('8288::Sqlike::constructor');
          this.pars = {
            
              tables  : [],
            
          },
          
          this.addr = addr;
        
      }
      
      run = (op,da)=>{
        //$lg('8291::run::addr,op,da',this.addr,op,da);
        return new Promise((res,rej)=>{
            new Xhr(this.addr)
            .ask(op,da)
            .rsp((data)=>{
                //$lg('8296::data::bgg',data);
            
                if(/<b>Warning<\/b>/i.test(data)){
                  if(/near/i.test(data)){
                    if(/syntax error/i.test(data)){
                      rej(data);
                    }
                  }
                }
                let obj = JSON.parse(data);
                /*let da  = obj.da;
                let dat = da.dat;
                $lg('8300::dat::bgy',dat);
                */
                res(obj);
                /*
                let ui = new Ui();
                let tbl = new ui.table(dat);
                    tbl.done();*/
                //$lg('100::dat',dat.id,dat.word,dat.pronun,dat.meaning,dat.english);
            },(err)=>{
                $lg('8304::err::bgo',err);
                rej(err);
            })
        })
      }
      
      tableWriter = (tableName,colArr)=>{
          
          //$lg('ajs:10246::ajs:sqlike.tableWriter');
          
          let tsl = (str)=>{
            if(str == '') return '';
            let arr = str.split(',');
            let rst = '';
            for(let ss of arr){ 
              let s = ss.toLowerCase();
              if(s == 'pri')  {rst += ' PRIMARY KEY'}else
              if(s == 'auto') {rst += ' AUTOINCREMENT'}else
              if(s == 'inc')  {rst += ' AUTOINCREMENT'}else
              if(s == 'uni')  {rst += ' UNIQUE'}else
              if(s == 'not')  {rst += ' NOT NULL'}else
              if(s == 'nn')   {rst += ' NOT NULL'}else
              if(s == 'def')  {rst += ' DEFAULT'}
              else{rst += ` ${ss}`}
            }
            return rst;
          }    
          let cmds = [];
              cmds.push(`DROP TABLE IF EXISTS ${tableName};\n`);
              cmds.push(`CREATE TABLE IF NOT EXISTS ${tableName}(\n`);
          let i = -1;
          for( let dat of colArr){
              i++;
              let col  = dat[0];
              let type = dat[1];
              let cons = dat[2] == null ? '' : dat[2];
                  cons = tsl(cons);
              if(col == 'id' && cons == '')cons  = ' PRIMARY KEY AUTOINCREMENT';
              let tail = i == colArr.length-1 ? '\n);' : ',\n';
              let line = `  ${col.padEnd(10,' ')} ${type.padEnd(12,' ')} ${cons}${tail}`;
              cmds.push(line);
          }
          let sql = cmds.join('');
          //alert(sql);
          //$lg('ajs:10278::sql::bgy',sql);
          return sql;

      }
      
      indexWriter = (tableName,colArr)=>{

          let cmds = [];
          
          for( let dat of colArr){
              
              let col  = dat[0];
              let type = dat[1] == undefined ? 'INDEX' : dat[1];
              
              let line = `CREATE ${type} IF NOT EXISTS ${tableName}_${col} ON ${tableName}(${col});`;
              cmds.push(line);
          }
        
          return cmds.join('');

      }
      
      conf  =   {
        
          table : (name,colsArr)=>{
              
              return this;
              
          },
          
          index : ()=>{
              
              return this;
              
          },
          
      }
      
      done = ()=>{
          
          return this;
          
      }
      
      fn = {
        
        esc : ( text )=>{
          /*
          let ucode = ( char )=>{
            let code = char.charCodeAt(0);
            let hex = code.toString(16);
            return `\\u${hex.padStart(4,'0')}`;
          }
          
          text = text.replace(/\(/g, ucode('(') );
          text = text.replace(/\)/g, ucode(')') );
          text = text.replace(/\,/g, ucode(',') );
          text = text.replace(/\'/g, ucode("'") );
          text = text.replace(/\"/g, ucode('"') );
          text = text.replace(/\`/g, ucode('`') );
          */
          text = text.replace(/\(/g, '\uff08' ) ;
          text = text.replace(/\)/g, '\uff09' ) ;
          text = text.replace(/\,/g, '\u201a' ) ;
          text = text.replace(/\'/g, '\u2032' ) ;
          text = text.replace(/\"/g, '\u2033' ) ;
          text = text.replace(/\`/g, '\u2035' ) ;
          
          return text;
          
        }
        
      }
      
  }

export class ajString{
  
  static splitSentences(text) {
    // 将文本按照标点符号切分成句子
    const sentences = text.split(/[。？；！.!?]+/)
    const result = []
  
    // 匹配缩写并进行切分
    const pattern = /([0-9]{1,2}\s?[aApP][mM]|[0-9]{1,2}:[0-9]{2})\s*\.|[A-Z]{2,}|[A-Z][a-z]*\.|[a-zA-Z]+/g
    for (const sentence of sentences) {
      let lang = /[\u4e00-\u9fa5]/.test(sentence);
      const matches = sentence.match(pattern)
  
      // 判断是否将缩写误认为句子结束
      if (matches) {
        const lastMatch = matches[matches.length - 1]
        if (lastMatch.endsWith('.') && !/^[A-Z]\.$/.test(lastMatch)) {
          // 如果缩写以句号结尾且不是人名缩写，则将句子分成两部分
          const index = sentence.lastIndexOf(lastMatch)
          result.push(sentence.substring(0, index + lastMatch.length))
          result.push(sentence.substring(index + lastMatch.length + 1).trim())
        } else {
          result.push(sentence)
        }
      } else {
        result.push(sentence)
      }
    }
  
    // 特殊处理括号和引号内的缩写
    const finalResult = []
    let inQuotes = false
    let inParentheses = false
    for (const sentence of result) {
      if (sentence.includes('"')) {
        inQuotes = !inQuotes
      }
      if (sentence.includes('(')) {
        inParentheses = true
      }
      if (sentence.includes(')')) {
        inParentheses = false
      }
      if (inQuotes || inParentheses) {
        finalResult[finalResult.length - 1] += sentence
      } else {
        finalResult.push(sentence)
      }
    }
  
    return finalResult;
  }
  
  
}

export class EventShared {
  
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  exec(eventName, data) {
    const listeners = this.events[eventName];
    if (listeners) {
      listeners.forEach(listener => {
        listener(data);
      });
    }
  }
  
}

export class Tool{
  
  //await delay(1000);
  static delay(ms){
    return new Promise((ok)=>{
      window.setTimeout(()=>{
        ok();
      },ms)
    })
  }
  
}

//export { Ajs, Load, Html, Css, Xhr, Log, Ui, Rec, Char, Doc, Webman } 