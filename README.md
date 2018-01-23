# laya-scene-manager

layabox 实现的场景管理类（ts版本）


使用步骤
- 配置场景config，需要在启动类（GameMain.ts）前引入，for example:

  ```
    class SCENES {
    
        /* login view */
        static LOGIN_VIEW: Scene = {
        
            /* altas and other resources */
            resArr: [{ url: "res/atlas/loginview.atlas", type: Laya.Loader.ATLAS }],
            
            /* custom view extends laya.ui.View */
            view: LoginView 
        };
    }

  ```
- 加载场景，默认会销毁旧场景并通过clearTextureRes释放资源，支持场景间传递参数（作为新场景构造函数的参数）
  ```
  /* load a new scene and destroy the old scenes */
  SceneManager.Instance.loadScene(SCENES.LOGIN_VIEW); 
  
  
  /* load scene additively */
  SceneManager.Instance.loadScene(SCENES.LOGIN_VIEW, true); 
  
  
  /* pass arguments to the new scene */
  SceneManager.Instance.loadScene(SCENES.LOGIN_VIEW, true, arg1, arg2); 
  
  ```
- 移除场景，其他用法详见.ts文件
  ```
  /* remove the current scene */
  SceneManager.Instance.removeCurrentScene();
  ```
