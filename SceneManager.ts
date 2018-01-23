interface Res {
    url: string
    type: string
}

interface Scene {
    resArr: Res[]
    view: any// typeof View
}

class SceneManager {
    public scenesStack: Scene[] = [];
    private static instance: SceneManager = null;
    public static get Instance(): SceneManager {
        if (SceneManager.instance == null)
            SceneManager.instance = new SceneManager();
        return SceneManager.instance;
    };
    
    constructor() {
    }
    
    // 加载场景 支持直接传递场景参数
    public loadScene(scene: Scene, isAdditive: boolean = false, ...args: any[]): void {
        let loadScene = () => {
            if (!isAdditive) {
                this.clearScenes();
            }
            let view: View = new scene.view(...args);
            if (view == null) return;
            this.scenesStack.push({
                resArr: scene.resArr,
                view
            });
            Laya.stage.addChild(view);
        }
        if (scene.resArr.length > 0) {
            Laya.loader.load(scene.resArr, Laya.Handler.create(this, loadScene, null, false));
        } else loadScene();
    }
    
    // 移除当前全部场景
    private clearScenes(): void {
        this.scenesStack.forEach(item => this.destroyScene(item));
        this.scenesStack = [];
    }

    // 移除指定index的场景
    public removeSceneByIndex(index: number): void {
        let scenes = this.scenesStack.splice(index, 1);
        if (scenes.length) this.destroyScene(scenes[0]);
    }

    // 移除指定类型的场景
    public removeSceneByType(scene: Scene): void {
        this.scenesStack = this.scenesStack.filter(item => {
            if (item.view instanceof scene.view) {
                this.destroyScene(item);
                return false;
            }
            return true;
        })
    }

    // 根据类型获取场景
    public getSceneByType(scene: Scene): any {
        let res = null;
        this.scenesStack.forEach(item => {
            if (item.view instanceof scene.view) {
                res = item.view;
            }
        })
        return res;
    }

    // 销毁场景及图集资源
    private destroyScene(scene: Scene): void {
        scene.view.destroy(true);
        scene.resArr.forEach(res => Laya.Loader.clearTextureRes(res.url));
    }

    // 获取当前场景
    public get currentScene(): Scene {
        return this.scenesStack[this.scenesStack.length - 1] || null;
    }

    // 移除当前场景
    public removeCurrentScene(): void {
        this.destroyScene(this.scenesStack.pop());
    }
}




