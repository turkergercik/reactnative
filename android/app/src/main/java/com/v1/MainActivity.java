package com.v1;
import android.app.Activity;
import android.app.ActivityManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.IntentFilter;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import android.os.Handler;
import android.os.PowerManager;
import android.text.TextUtils;
import android.util.Log;
import android.view.WindowManager;
import android.view.Window;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationManagerCompat;

import android.content.Intent;
import android.os.Build;  
import android.provider.Settings; 
import android.net.Uri;
import android.widget.Toast;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  public Handler handler = new Handler();
    public Runnable r=null;

   @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
     Window w = getWindow();
getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON|
 WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD|
 WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED|
 WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);
       if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
           if (!Settings.canDrawOverlays(this)) {
              Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,Uri.parse("package:" + getPackageName()));
              startActivityForResult(intent, 0);
          }
       }
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
       boolean c= isNotificationChannelEnabled(getApplicationContext(),"3");
       if(c){
           Intent intent = new Intent(Settings.ACTION_CHANNEL_NOTIFICATION_SETTINGS);
           intent.putExtra(Settings.EXTRA_APP_PACKAGE, getPackageName());
           intent.putExtra(Settings.EXTRA_CHANNEL_ID, "3");
           startActivity(intent);
       }



  }

    public boolean isNotificationChannelEnabled(Context context, @Nullable String channelId){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            if(!TextUtils.isEmpty(channelId)) {
                NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
                NotificationChannel channel = manager.getNotificationChannel(channelId);
                return channel.getImportance() != NotificationManager.IMPORTANCE_NONE;
            }
            return false;
        } else {
            return NotificationManagerCompat.from(context).areNotificationsEnabled();
        }
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
  @Override
    public void onDestroy() {
      Log.d("hey","son");
stars();
        super.onDestroy();

    }

  }



