package com.v1;
import io.socket.client.IO;
import io.socket.client.Socket;
import android.app.ActivityManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkInfo;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.facebook.react.HeadlessJsTaskService;

import java.net.URISyntaxException;
import java.util.List;
public class NetworkChangeReceiver extends Service {
    BroadcastReceiver broadcastReceiver;
    public boolean check=false;
public class NetworkChangeReceivers extends BroadcastReceiver {
public int x=0;
public Handler handler = new Handler();
public boolean net = isNetworkAvailable(getApplicationContext());
public Runnable r=null;
    @Override
    public void onReceive(final Context context, final Intent intent) {
        x=x+1;
        if(x!=1){
            if(r!=null) {
                handler.removeCallbacks(r);

            }
            r = () -> {
                boolean y = isNetworkAvailable(context);
                if(net==y){

                }else{
                    Work(context,y);
                    net=y;


                }
                Log.d("hey","internet"+y+net);
            };
            handler.postDelayed(r, 2000);

        }

        //chkStatus(context);




    }
private void Work(Context context,boolean a){

    String s=String.valueOf(x);
    String b;
    if(a==true){
        b= "İnternet var";
    }else{
        b= "İnternet yok";
    }
    System.out.println(x);
    Log.d("hey",String.valueOf(x));
    Toast.makeText(context,b, Toast.LENGTH_LONG).show();
    /**
     This part will be called every time network connection is changed
     e.g. Connected -> Not Connected
     **/
    if (!isAppOnForeground((context)) & x!=1) {
        /**
         We will start our service and send extra info about
         network connections
         **/
        boolean hasInternet = isNetworkAvailable(context);
        Intent serviceIntent = new Intent(context, headless.class);
        serviceIntent.putExtra("hasInternet", hasInternet);
        context.startService(serviceIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);
    }

}
    private boolean isAppOnForeground(Context context) {
        /**
         We need to check if app is in foreground otherwise the app will crash.
         http://stackoverflow.com/questions/8489993/check-android-application-is-in-foreground-or-not
         **/
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> appProcesses =
                activityManager.getRunningAppProcesses();
        if (appProcesses == null) {
            return false;
        }
        final String packageName = context.getPackageName();
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (appProcess.importance ==
                    ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
                    appProcess.processName.equals(packageName)) {
                return true;
            }
        }
        return false;
    }
    public boolean isNetworkAvailable(Context context) {
        ConnectivityManager cm = (ConnectivityManager)
                context.getSystemService(Context.CONNECTIVITY_SERVICE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Network networkCapabilities = cm.getActiveNetwork();

            if(networkCapabilities == null) {
                return false;
            }

            NetworkCapabilities actNw = cm.getNetworkCapabilities(networkCapabilities);

            if(actNw == null) {
                return false;
            }

            if(actNw.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) || actNw.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) || actNw.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET)) {
                return true;
            }

            return false;
        }

        // deprecated in API level 29
        NetworkInfo netInfo = cm.getActiveNetworkInfo();
        return (netInfo != null && netInfo.isConnected());
    }
}
    @Override
    public void onTaskRemoved(Intent rootIntent){
        Socket mSocket;
        try {
            mSocket = IO.socket("http://192.168.1.108:3001");
            //mSocket.connect();
            mSocket.emit("dc1", "64f2362e310a1e922451c194");
        } catch (URISyntaxException e) {

        }
        Log.d("hey","onTaskRemoved");
        Toast.makeText(getApplicationContext(),"yeniden", Toast.LENGTH_LONG).show();
        Intent service = new Intent(getApplicationContext(), NetworkChangeReceiver.class);
       getApplicationContext().startService(service);
        super.onTaskRemoved(rootIntent);
    }
    @Override
    public void onCreate() {
        Intent service = new Intent(getApplicationContext(), NetworkChangeReceiver.class);
        //getApplicationContext().startService(service);
        Log.d("hey","selamiiiii");
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel("3", "background service notification", NotificationManager.IMPORTANCE_NONE);
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);



        Notification notification = new NotificationCompat.Builder(getApplicationContext(),"3").build();
        startForeground(12, notification);
        NotificationManager notificationManager = (NotificationManager) getApplicationContext().getSystemService(Context.NOTIFICATION_SERVICE);
       Handler h = new Handler();
       Runnable b = ()->{
       };
       h.postDelayed(b,1000);
        }
        //stopForeground(true);
        // create IntentFilter
        //add actions
if(check==false){
    IntentFilter filter = new IntentFilter();
    filter.addAction("android.net.conn.CONNECTIVITY_CHANGE");
    registerReceiver(new NetworkChangeReceivers(), filter);
    check=true;
}



    }
    @Override
    public int onStartCommand(Intent intent, int flags, int startId){



        return START_STICKY;
    }




    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}