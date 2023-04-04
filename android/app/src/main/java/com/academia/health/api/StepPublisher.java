package com.academia.health.api;

import android.util.Log;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class StepPublisher implements Callback<StepResult> {

    static final String BASE_URL = "https://health-balance.ru/";
    private final Gson gson;
    private final Retrofit retrofit;
    private final StepService stepServiceApi;
    private static final String TAG = StepPublisher.class.toString();

    public StepPublisher() {
        gson = new GsonBuilder()
                .setLenient().create();
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        stepServiceApi = retrofit.create(StepService.class);
    }

    public void send(String token, int steps, String date) {
        RequestBody requestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("data", "[{\"date\":\"" + date + "\", \"steps\":" + steps + "}]")
                .build();

        Call<StepResult> call = stepServiceApi.sendSteps(token, requestBody);
        call.enqueue(this);
    }

    @Override
    public void onResponse(Call<StepResult> call, Response<StepResult> response) {
        Log.e(TAG, "response: " + response.toString());
    }

    @Override
    public void onFailure(Call<StepResult> call, Throwable t) {
        Log.e(TAG, "error: " + t.toString());
    }
}
