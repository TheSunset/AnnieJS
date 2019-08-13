/**
 * @module annie
 */
namespace annie {
    /**
     * 显示对象抽象类,不能直接实例化。一切显示对象的基类,包含了显示对象需要的一切属性
     * DisplayObject 类本身不包含任何用于在屏幕上呈现内容的 API。
     * 因此，如果要创建 DisplayObject 类的自定义子类，您将需要扩展其中一个具有在屏幕
     * 上呈现内容的 API 的子类，如 Shape、Sprite、Bitmap、TextField 或 MovieClip 类。
     * @class annie.DisplayObject
     * @since 1.0.0
     * @extends annie.EventDispatcher
     */
    export abstract class DisplayObject extends EventDispatcher {
        // events:
        /**
         * annie.DisplayObject显示对象加入到舞台事件
         * @event ADD_TO_STAGE
         * @since 1.0.0
         */
        /**
         * annie.DisplayObject显示对象从舞台移出事件
         * @event REMOVE_TO_STAGE
         * @since 1.0.0
         */

        /**
         * annie.DisplayObject显示对象 循环帧事件
         * @event ENTER_FRAME
         * @since 1.0.0
         */
        //MouseEvent
        /**
         * annie.DisplayObject鼠标或者手指按下事件
         * @event MOUSE_DOWN
         * @since 1.0.0
         */
        /**
         * annie.DisplayObject鼠标或者手指抬起事件
         * @event MOUSE_UP
         * @since 1.0.0
         */
        /**
         * annie.DisplayObject鼠标或者手指单击
         * @event CLICK
         * @type {string}
         */
        /**
         * annie.DisplayObject鼠标或者手指移动事件
         * @event MOUSE_MOVE
         * @since 1.0.0
         */
        /**
         * annie.DisplayObject鼠标或者手指移入到显示对象上里触发的事件
         * @event MOUSE_OVER
         * @since 1.0.0
         */
        /**
         * annie.DisplayObject鼠标或者手指移出显示对象边界触发的事件
         * @event MOUSE_OUT
         * @since 1.0.0
         */

//
        /**
         * @method DisplayObject
         * @since 1.0.0
         * @public
         */
        constructor() {
            super();
            this._instanceType = "annie.DisplayObject";
        }

        //更新信息对象是否更新矩阵 a2x_ua 是否更新Alpha a2x_uf 是否更新滤镜
        protected a2x_um: boolean = true;
        protected a2x_ua: boolean = true;
        protected a2x_uf: boolean = false;
        /**
         * 此显示对象所在的舞台对象,如果此对象没有被添加到显示对象列表中,此对象为空。
         * @property stage
         * @public
         * @since 1.0.0
         * @type {Stage}
         * @default null;
         * @readonly
         * */
        public stage: Stage = null;
        /**
         * 显示对象的父级
         * @property parent
         * @since 1.0.0
         * @public
         * @type {annie.Sprite}
         * @default null
         * @readonly
         */
        public parent: Sprite = null;

        //显示对象在显示列表上的最终表现出来的透明度,此透明度会继承父级的透明度依次相乘得到最终的值
        protected cAlpha: number = 1;

        //显示对象上对显示列表上的最终合成的矩阵,此矩阵会继承父级的显示属性依次相乘得到最终的值
        protected cMatrix: Matrix = new Matrix();

        /**
         * 是否可以接受点击事件,如果设置为false,此显示对象将无法接收到点击事件
         * @property mouseEnable
         * @type {boolean}
         * @public
         * @since 1.0.0
         * @default false
         */
        public mouseEnable: boolean = true;
        //显示对象上对显示列表上的最终的所有滤镜组
        protected cFilters: any = [];
        /**
         * 每一个显示对象都可以给他命一个名字,这样我们在查找子级的时候就可以直接用this.getChildrndByName("name")获取到这个对象的引用
         * @property name
         * @since 1.0.0
         * @public
         * @type {string}
         * @default ""
         */
        public name: string = "";
        private _lastX: number = 0;
        private _lastY: number = 0;

        /**
         * 显示对象位置x
         * @property x
         * @public
         * @since 1.0.0
         * @type {number}
         * @default 0
         */
        public get x(): number {
            return this._x;
        }

        public set x(value: number) {
            let s = this;
            if (value != s._x) {
                s._x = value;
                s._lastX = value + s._offsetX;
                s.a2x_um = true;
            }
        }

        private _x: number = 0;

        protected get offsetX(): number {
            return this._offsetX;
        }

        protected set offsetX(value: number) {
            let s = this;
            if (value != s._offsetX) {
                s._offsetX = value;
                s._lastX = value + s._x;
                s.a2x_um = true;
            }
        }

        protected _offsetX: number = 0;

        protected get offsetY(): number {
            return this._offsetY;
        }

        protected set offsetY(value: number) {
            let s = this;
            if (value != s._offsetY) {
                s._offsetY = value;
                s._lastY = value + s._y;
                s.a2x_um = true;
            }
        }

        protected _offsetY: number = 0;

        /**
         * 显示对象位置y
         * @property y
         * @public
         * @since 1.0.0
         * @type {number}
         * @default 0
         */
        public get y(): number {
            return this._y;
        }

        public set y(value: number) {
            let s = this;
            if (value != s._y) {
                s._y = value;
                s._lastY = value + s._offsetY;
                s.a2x_um = true;
            }
        }

        private _y: number = 0;

        /**
         * 显示对象x方向的缩放值
         * @property scaleX
         * @public
         * @since 1.0.0
         * @type {number}
         * @default 1
         */
        public get scaleX(): number {
            return this._scaleX;
        }

        public set scaleX(value: number) {
            let s = this;
            if (value != s._scaleX) {
                s._scaleX = value;
                s.a2x_um = true;
            }
        }


        private _scaleX: number = 1;

        /**
         * 显示对象y方向的缩放值
         * @property scaleY
         * @public
         * @since 1.0.0
         * @type {number}
         * @default 1
         */
        public get scaleY(): number {
            return this._scaleY;
        }

        public set scaleY(value: number) {
            let s = this;
            if (value != s._scaleY) {
                s._scaleY = value;
                s.a2x_um = true;
            }
        }

        private _scaleY: number = 1;

        /**
         * 显示对象旋转角度
         * @property rotation
         * @public
         * @since 1.0.0
         * @type {number}
         * @default 0
         */
        public get rotation(): number {
            return this._rotation;
        }

        public set rotation(value: number) {
            let s = this;
            if (value != s._rotation) {
                s._rotation = value;
                s.a2x_um = true;
            }
        }

        private _rotation: number = 0;

        /**
         * 显示对象透明度
         * @property alpha
         * @public
         * @since 1.0.0
         * @type {number}
         * @default 1
         */
        public get alpha(): number {
            return this._alpha;
        }

        public set alpha(value: number) {
            let s = this;
            if (value != s._alpha) {
                s._alpha = value;
                s.a2x_ua = true;
            }
        }

        private _alpha: number = 1;

        /**
         * 显示对象x方向的斜切值
         * @property skewX
         * @public
         * @since 1.0.0
         * @type {number}
         * @default 0
         */
        public get skewX(): number {
            return this._skewX;
        }

        public set skewX(value: number) {
            let s = this;
            if (value != s._skewX) {
                s._skewX = value;
                s.a2x_um = true;
            }
        }

        private _skewX: number = 0;

        /**
         * 显示对象y方向的斜切值
         * @property skewY
         * @public
         * @since 1.0.0
         * @type {number}
         * @default 0
         */
        public get skewY(): number {
            return this._skewY;
        }

        public set skewY(value: number) {
            let s = this;
            if (value != s._skewY) {
                s._skewY = value;
                s.a2x_um = true;
            }
        }

        private _skewY: number = 0;

        /**
         * 显示对象上x方向的缩放或旋转点
         * @property anchorX
         * @public
         * @since 1.0.0
         * @type {number}
         * @default 0
         */
        public get anchorX(): number {
            return this._anchorX;
        }

        public set anchorX(value: number) {
            let s = this;
            if (value != s._anchorX) {
                s._anchorX = value;
                s.a2x_um = true;
            }
        }

        private _anchorX: number = 0;

        /**
         * 显示对象上y方向的缩放或旋转点
         * @property anchorY
         * @public
         * @since 1.0.0
         * @type {number}
         * @default 0
         */
        public get anchorY(): number {
            return this._anchorY;
        }

        public set anchorY(value: number) {
            let s: any = this;
            if (value != s._anchorY) {
                s._anchorY = value;
                s.a2x_um = true;
            }
        }

        private _anchorY: number = 0;

        /**
         * 显未对象是否可见
         * @property visible
         * @public
         * @since 1.0.0
         * @type {boolean}
         * @default 0
         */
        public get visible() {
            return this._visible;
        }

        public set visible(value: boolean) {
            let s = this;
            if (value != s._visible) {
                if (value)
                    s._cp = true;
                s._visible = value;
            }
        }

        public _visible: boolean = true;
        /**
         * 显示对象的混合模式
         * 支持的混合模式大概有
         * @property blendMode
         * @public
         * @since 1.0.0
         * @type {string}
         * @default 0
         */

        //public blendMode: string = "normal";
        /**
         * 显示对象的变形矩阵
         * @property matrix
         * @public
         * @since 1.0.0
         * @type {annie.Matrix}
         * @default null
         */
        public get matrix(): Matrix {
            return this._matrix
        };

        private _matrix: Matrix = new Matrix();

        /**
         * 显示对象的遮罩, 是一个Shape显示对象或是一个只包含shape显示对象的MovieClip
         * @property mask
         * @public
         * @since 1.0.0
         * @type {annie.DisplayObject}
         * @default null
         */
        public get mask(): DisplayObject {
            return this._mask;
        }

        public set mask(value: DisplayObject) {
            let s = this;
            if (value != s._mask) {
                if (value instanceof annie.DisplayObject) {
                    value._isUseToMask++;
                } else {
                    if (s._mask instanceof annie.DisplayObject) {
                        s._mask._isUseToMask--;
                    }
                }
                s._mask = value;

            }
        }

        private _mask: DisplayObject = null;

        /**
         * <h4><font color="red">小游戏不支持 小程序不支持</font></h4>
         * 显示对象的滤镜数组
         * @property filters
         * @since 1.0.0
         * @public
         * @type {Array}
         * @default null
         */
        public get filters(): any[] {
            return this._filters;
        }

        public set filters(value: any[]) {
            this._filters = value;
            this.a2x_uf = true;
        }

        private _filters: any[] = [];

        //是否自己的父级发生的改变
        public _cp: boolean = true;

        /**
         *将全局坐标转换到本地坐标值
         * @method globalToLocal
         * @since 1.0.0
         * @public
         * @param {annie.Point} point
         * @return {annie.Point}
         */
        public globalToLocal(point: Point, bp: Point = null): Point {
            return this.cMatrix.invert().transformPoint(point.x, point.y, bp);
        }

        /**
         *将本地坐标转换到全局坐标值
         * @method localToGlobal
         * @public
         * @since 1.0.0
         * @param {annie.Point} point
         * @return {annie.Point}
         */
        public localToGlobal(point: Point, bp: Point = null): Point {
            let s = this;
            if (s.parent instanceof annie.Sprite) {
                //下一级的坐标始终应该是相对父级来说的，所以是用父级的矩阵去转换
                return s.parent.cMatrix.transformPoint(point.x, point.y, bp);
            } else {
                //没有父级
                return s.cMatrix.transformPoint(point.x, point.y, bp);
            }
        }

        //为了 hitTestPoint，localToGlobal，globalToLocal等方法不复新不重复生成新的点对象而节约内存
        public static _bp: Point = new Point();
        public static _p1: Point = new Point();
        public static _p2: Point = new Point();
        public static _p3: Point = new Point();
        public static _p4: Point = new Point();
        protected _isUseToMask: number = 0;

        /**
         * 点击碰撞测试,就是舞台上的一个point是否在显示对象内,在则返回该对象，不在则返回null
         * @method hitTestPoint
         * @public
         * @since 1.0.0
         * @param {annie.Point} hitPoint 要检测碰撞的点
         * @param {boolean} isGlobalPoint 是不是全局坐标的点,默认false是本地坐标
         * @return {annie.DisplayObject}
         */
        public hitTestPoint(hitPoint: Point, isGlobalPoint: boolean = false): DisplayObject {
            let s = this;
            if (!s.visible || !s.mouseEnable) return null;
            let p: Point;
            if (isGlobalPoint) {
                p = s.globalToLocal(hitPoint, DisplayObject._bp);
            } else {
                p = hitPoint;
            }
            p.x += s._offsetX;
            p.y += s._offsetY;
            if (s._bounds.isPointIn(p)) {
                return s;
            }
            return null;
        }

        public getBounds(): Rectangle {
            return this._bounds;
        }

        /**
         * 获取对象形变后外切矩形。
         * 可以从这个方法中读取到此显示对象变形后x方向上的宽和y方向上的高
         * @method getDrawRect
         * @public
         * @since 1.0.0
         * @return {annie.Rectangle}
         */
        public getDrawRect(): Rectangle {
            let s = this;
            s.getBounds();
            let x: number = s._bounds.x, y: number = s._bounds.y, w: number = s._bounds.width,
                h: number = s._bounds.height;
            if (s._mask instanceof annie.DisplayObject) {
                let maskRect = s._mask.getDrawRect();
                if (x < maskRect.x) {
                    x = maskRect.x;
                }
                if (y < maskRect.y) {
                    y = maskRect.y;
                }
                if (w > maskRect.width) {
                    w = maskRect.width;
                }
                if (h > maskRect.height) {
                    h = maskRect.height;
                }
            }
            s.matrix.transformPoint(x, y, DisplayObject._p1);
            s.matrix.transformPoint(x + w, y, DisplayObject._p2);
            s.matrix.transformPoint(x + w, y + h, DisplayObject._p3);
            s.matrix.transformPoint(x, y + h, DisplayObject._p4);
            Rectangle.createFromPoints(s._drawRect, DisplayObject._p1, DisplayObject._p2, DisplayObject._p3, DisplayObject._p4);
            return s._drawRect;
        }

        /**
         * 更新函数
         * @method update
         * @public
         * @since 1.0.0
         * @return {void}
         */
        protected updateMatrix(): void {
            let s = this;
            let isHadParent: boolean = s.parent instanceof annie.Sprite;
            if (s.a2x_um) {
                s._matrix.createBox(s._lastX, s._lastY, s._scaleX, s._scaleY, s._rotation, s._skewX, s._skewY, s._anchorX - s._offsetX, s._anchorY - s._offsetY);
            }
            if (s._cp) {
                s.a2x_um = s.a2x_ua = s.a2x_uf = true;
                s._cp = false;
            } else {
                if (isHadParent) {
                    let PUI = s.parent;
                    if (PUI.a2x_um) {
                        s.a2x_um = true;
                    }
                    if (PUI.a2x_ua) {
                        s.a2x_ua = true;
                    }
                    if (PUI.a2x_uf) {
                        s.a2x_uf = true;
                    }
                }
            }
            if (s.a2x_um) {
                s.cMatrix.setFrom(s._matrix);
                if (isHadParent) {
                    s.cMatrix.prepend(s.parent.cMatrix);
                }
            }
            if (s.a2x_ua) {
                s.cAlpha = s._alpha;
                if (isHadParent) {
                    s.cAlpha *= s.parent.cAlpha;
                }
            }
            if (s.a2x_uf) {
                s.cFilters = [];
                let sf = s.filters;
                if (sf instanceof Array) {
                    let len = sf.length;
                    for (let i = 0; i < len; i++) {
                        s.cFilters.push(sf[i]);
                    }
                }
                if (isHadParent) {
                    if (s.parent.cFilters.length > 0) {
                        let len = s.parent.cFilters.length, pf = s.parent.cFilters;
                        for (let i = len - 1; i >= 0; i--) {
                            s.cFilters.unshift(pf[i]);
                        }
                    }
                }
            }
        }

        /**
         * 调用此方法将显示对象渲染到屏幕
         * @method render
         * @public
         * @since 1.0.0
         * @param {annie.IRender} renderObj
         * @return {void}
         */
        public render(renderObj: IRender | any): void {
            let s = this;
            if (s._visible) {
                if (s.cAlpha > 0) {
                    let cf = s.cFilters;
                    let cfLen = cf.length;
                    let fId = -1;
                    if (cfLen) {
                        for (let i = 0; i < cfLen; i++) {
                            if (s.cFilters[i].type == "Shadow") {
                                fId = i;
                                break;
                            }
                        }
                    }
                    if (fId >= 0) {
                        let ctx: any = renderObj["_ctx"];
                        ctx.shadowBlur = cf[fId].blur;
                        ctx.shadowColor = cf[fId].color;
                        ctx.shadowOffsetX = cf[fId].offsetX;
                        ctx.shadowOffsetY = cf[fId].offsetY;
                        renderObj.draw(s);
                        ctx.shadowBlur = 0;
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 0;
                    } else {
                        renderObj.draw(s);
                    }
                }
            }
        }

        /**
         * 获取或者设置显示对象在父级里的x方向的宽，不到必要不要用此属性获取高
         * 如果你要同时获取宽高，建议使用getWH()方法获取宽和高
         * @property  width
         * @public
         * @since 1.0.3
         * @return {number}
         */
        public get width(): number {
            return this.getDrawRect().width;
        }

        public set width(value: number) {
            let s = this;
            let w = s.getDrawRect().width;
            if (value > 0 && w > 0) {
                let sx = value / w;
                s.scaleX *= sx;
            }
        }

        /**
         * 获取或者设置显示对象在父级里的y方向的高,不到必要不要用此属性获取高
         * 如果你要同时获取宽高，建议使用getWH()方法获取宽和高
         * @property  height
         * @public
         * @since 1.0.3
         * @return {number}
         */
        public get height(): number {
            return this.getDrawRect().height;
        }

        public set height(value: number) {
            let s = this;
            let h = s.getDrawRect().height;
            if (value > 0 && h > 0) {
                let sy = value / h;
                s.scaleY *= sy;
            }
        }

        //画缓存位图的时候需要使用
        //<h4><font color="red">小游戏不支持 小程序不支持</font></h4>
        public static _canvas: any = window.document.createElement("canvas");
        // 缓存起来的纹理对象。最后真正送到渲染器去渲染的对象
        protected _texture: any = null;
        protected _drawRect: Rectangle = new Rectangle();
        protected _bounds: Rectangle = new Rectangle();

        /**
         * 停止这个显示对象上的所有声音
         * @method stopAllSounds
         * @public
         * @since 2.0.0
         * @return {void}
         */
        public stopAllSounds(): void {
            let sounds = this.soundList;
            if (sounds instanceof Array) {
                for (let i = sounds.length - 1; i >= 0; i--) {
                    sounds[i].stop();
                }
            }
        }

        /**
         * @method getSound
         * @param {number|string} id
         * @return {Array} 这个对象里所有叫这个名字的声音引用数组
         * @since 2.0.0
         */
        public getSound(id: any): any {
            let sounds = this.soundList,
                newSounds: any = [];
            if (sounds instanceof Array) {
                if (typeof(id) == "string") {
                    for (let i = sounds.length - 1; i >= 0; i--) {
                        if (sounds[i].name == id) {
                            newSounds.push(sounds[i]);
                        }
                    }
                } else {
                    if (id >= 0 && id < sounds.length) {
                        newSounds.push(sounds[id]);
                    }
                }
            }
            return newSounds;
        }

        /**
         * 当前对象包含的声音列表
         * @property soundList
         * @public
         * @since 2.0.0
         * @type {Array}
         * @default []
         */
        public soundList: any = [];

        /**
         * 返回一个id，这个id你要留着作为删除他时使用。
         * 这个声音会根据这个显示对象添加到舞台时播放，移出舞台而关闭
         * @method addSound
         * @param {annie.Sound} sound
         * @return {void}
         * @since 2.0.0
         * @public
         */
        public addSound(sound: annie.Sound): void {
            let s = this;
            if (!(s.soundList instanceof Array)) {
                s.soundList = [];
            }
            s.soundList.push(sound);
        }

        /**
         * 删除一个已经添加进来的声音
         * @method removeSound
         * @public
         * @since 2.0.0
         * @param {number|string} id
         * @return {void}
         */
        public removeSound(id: number | string): void {
            let sounds = this.soundList;
            if (sounds instanceof Array) {
                if (typeof(id) == "string") {
                    for (let i = sounds.length - 1; i >= 0; i--) {
                        if (sounds[i].name == id) {
                            sounds.splice(i, 1);
                        }
                    }
                } else {
                    if (id >= 0 && id < sounds.length) {
                        sounds.splice(id, 1);
                    }
                }
            }
        }

        //每个Flash文件生成的对象都有一个自带的初始化信息
        private _a2x_res_obj: any = {};

        public destroy(): void {
            let s: any = this;
            //清除相应的数据引用
            s.stopAllSounds();
            for (let i = 0; i < s.soundList.length; i++) {
                s.soundList[i].destroy();
            }
            s._a2x_res_obj = null;
            s.mask = null;
            s.filters = null;
            s.parent = null;
            s.stage = null;
            s._bounds = null;
            s._drawRect = null;
            s._dragBounds = null;
            s._lastDragPoint = null;
            s.cFilters = null;
            s._matrix = null;
            s.cMatrix = null;
            s._texture = null;
            s._visible = false;
            super.destroy();
        }

        public _isOnStage: boolean = false;

        public _onRemoveEvent(isReSetMc: boolean): void {
            //如果有音乐,则关闭音乐
            let s = this;
            s._isOnStage = false;
            let sounds = s.soundList;
            if (sounds.length > 0) {
                for (let i = 0; i < sounds.length; i++) {
                    sounds[i].stop2();
                }
            }
            s.dispatchEvent(annie.Event.REMOVE_TO_STAGE);
        }

        public _onAddEvent(): void {
            let s = this;
            s._isOnStage = true;
            //如果有音乐，则播放音乐
            let sounds = s.soundList;
            if (sounds.length > 0) {
                for (let i = 0; i < sounds.length; i++) {
                    sounds[i].play2();
                }
            }
            s.dispatchEvent(annie.Event.ADD_TO_STAGE);
        }

        public _onEnterFrameEvent(): void {
            let s = this;
            if (!s._visible) {
                return;
            }
            s.dispatchEvent(annie.Event.ENTER_FRAME);
        }

        /**
         * 鼠标跟随
         * @method startDrag
         * @param {annie.Point|boolean} 当dragPoint 为annie.Point对象时，那就是跟随时鼠标对应显示对象的(x,y)坐标位置；如果为true或false,则表示是否绑定到中心
         * @param {annie.Rectangle} dragRect 跟随范围
         */
        public startDrag(dragPoint: annie.Point = null, dragRect: annie.Rectangle = null) {
            DisplayObject._startDrag(this, dragPoint, dragRect);
        }

        private static _startDrag(target: DisplayObject, dragPoint: annie.Point = null, dragRound: annie.Rectangle = null) {
            let s = target;
            if (s.stage instanceof annie.Stage) {
                s.stage._dragDisplayObject = s;
                if (dragPoint instanceof annie.Point) {
                    s.stage._dragPoint.x = dragPoint.x;
                    s.stage._dragPoint.y = dragPoint.y;
                    s.stage._isFixedDrag = true;
                } else {
                    if (dragPoint === true) {
                        let drawRect = s.getDrawRect();
                        s.stage._dragPoint.x = drawRect.x + (drawRect.width >> 1);
                        s.stage._dragPoint.y = drawRect.y + (drawRect.height >> 1);
                        s.stage._isFixedDrag = true;
                    } else {
                        s.stage._isFixedDrag = false;
                    }
                }
                if (dragRound instanceof annie.Rectangle) {
                    s.stage._dragRect.x = dragRound.x;
                    s.stage._dragRect.y = dragRound.y;
                    s.stage._dragRect.width = dragRound.width;
                    s.stage._dragRect.height = dragRound.height;
                } else {
                    s.stage._dragRect.x = Number.MIN_VALUE;
                    s.stage._dragRect.y = Number.MIN_VALUE;
                    s.stage._dragRect.width = Number.MAX_VALUE;
                    s.stage._dragRect.height = Number.MAX_VALUE;
                }
            }
        }

        private static _stopDrage(target: DisplayObject) {
            let s = target;
            if (s.stage instanceof annie.Stage) {
                s.stage._dragDisplayObject = null;
            }
        }

        /**
         * 停止鼠标跟随
         * @method stopDrag
         */
        public stopDrag() {
            DisplayObject._stopDrage(this);
        }
    }
}