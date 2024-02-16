package com.v1;
import android.app.Activity;
import android.app.ActivityManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.IntentFilter;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.graphics.Color;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import android.os.Handler;
import android.os.PowerManager;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.view.Window;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;

import android.content.Intent;
import android.os.Build;
import android.provider.Settings;
import android.net.Uri;
import android.view.animation.Animation;
import android.view.animation.LinearInterpolator;
import android.view.animation.RotateAnimation;
import android.widget.Toast;

import org.devio.rn.splashscreen.SplashScreen;

import io.invertase.notifee.NotifeeApiModule;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  public static Activity activity;
  public Handler handler = new Handler();
    public Runnable r=null;
   @RequiresApi(api = Build.VERSION_CODES.P)
   @Override
  protected void onCreate(Bundle savedInstanceState) {
       //SplashScreen.show(this);  // here
    super.onCreate(null);
    activity=this;
       /*Window w =  getWindow();
       w.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON|
               WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD|
               WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED|
               WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);*/
       /*if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
           Intent intent = new Intent();
           String packageName = getPackageName();
           PowerManager pm = (PowerManager) getSystemService(POWER_SERVICE);
           if (!pm.isIgnoringBatteryOptimizations(packageName)) {
               intent.setAction(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
               intent.setData(Uri.parse("package:" + packageName));
               startActivity(intent);
           }
       }
       /*IntentFilter filter = new IntentFilter();
       filter.addAction("android.net.conn.CONNECTIVITY_CHANGE");
       registerReceiver(new NetworkChangeReceiver(), filter);*/

       stars();
       getWindow().getDecorView().setBackgroundColor(Color.BLACK);
       String manufacturer = "xiaomi";
      /* if (manufacturer.equalsIgnoreCase(android.os.Build.MANUFACTURER)) {
           //this will open auto start screen where user can enable permission for your app
           Intent intent1 = new Intent();
           intent1.setComponent(new ComponentName("com.miui.securitycenter", "com.miui.permcenter.autostart.AutoStartManagementActivity"));
           startActivity(intent1);
       }*/


   }


    private boolean isMyServiceRunning(Class<?> serviceClass) {
        ActivityManager manager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }
    public void stars(){
       if(isMyServiceRunning(NetworkChangeReceiver.class)){


       }else{
           Intent service = new Intent(getApplicationContext(), NetworkChangeReceiver.class);
           if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
               getApplicationContext().startForegroundService(service);
           }
       }


    }
    public void onNewIntent(Intent intent) {

        super.onNewIntent(intent);
    }

  @Override
  protected String getMainComponentName() {
      return NotifeeApiModule.getMainComponent("v1");
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

  @Override
    public void onDestroy() {
      Log.d("hey","son");
stars();
        super.onDestroy();

    }


  }



