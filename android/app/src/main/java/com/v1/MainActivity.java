package com.v1;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import android.view.WindowManager;
import android.view.Window;
import androidx.appcompat.app.AppCompatActivity; 
import android.content.Intent; 
import android.os.Build;  
import android.provider.Settings; 
import android.net.Uri;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */


   @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
     Window w = getWindow();
getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON|
 WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD|
 WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED|
 WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);
 if (!Settings.canDrawOverlays(this)) {
    Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,Uri.parse("package:" + getPackageName()));
    startActivityForResult(intent, 0);
}
  }
  @Override
  protected String getMainComponentName() {
    return "v1";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
  }
}
