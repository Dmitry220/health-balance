package com.academia.health;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.adscientiam.capacitor.googlefit.GoogleFitPlugin;


public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(PedometerPlugin.class);
        registerPlugin(GoogleFitPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
