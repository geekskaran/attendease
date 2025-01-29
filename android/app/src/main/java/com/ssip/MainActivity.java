package com.FitnessChallenge;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  private static final String TAG = "MainActivity";

  @Override
  protected String getMainComponentName() {
    return "FitnessChallenge";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
      this,
      getMainComponentName(),
      DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    handleIntent(getIntent());
  }

  @Override
  public void onNewIntent(Intent intent) { // Change to public
    super.onNewIntent(intent);
    setIntent(intent);
    handleIntent(intent);
  }

  private void handleIntent(Intent intent) {
    if (Intent.ACTION_VIEW.equals(intent.getAction())) {
      Uri fileUri = intent.getData();
      if (fileUri != null) {
        String fileExtension = getContentResolver().getType(fileUri);
        if (fileExtension != null && (fileExtension.endsWith(".cri") || fileExtension.endsWith(".crv"))) {
          Log.d(TAG, "Received file with extension .cri or .crv: " + fileUri.toString());
          sendFileUriToReactNative(fileUri);
        }
      }
    }
  }

  private void sendFileUriToReactNative(Uri fileUri) {
    if (fileUri == null) return;

    String uriString = fileUri.toString();
    Intent intent = new Intent("com.FitnessChallenge.FILE_OPEN");
    intent.putExtra("fileUri", uriString);
    sendBroadcast(intent);
  }
}
