**Because the steps arent that easy, i now offer to fully remove pairip from any apk. It would cost just a little bit cause its a bit time consuming
If interested contact on discord @mawocoder**

If you need help, open an issue and contact me on discord @mawocoder


# Google PairIp Bypass

In the following i will provide some insights into Google PairIp protection and how to bypass it with code.
This is for educational purposes only and i do not encourage you to try/use this in any harmful way. Any damage which occours because of using this is not my fault.

If you are new to pairip read the following. If you know what you are doing and just need the code, skip the questions.

**1. What is PairIp**
PairIp is a strong security feature by google to protect apks from modding. It receives updates and is used in many well known mobile applications.

**2. How does PairIp work?**
The apk requires important strings like api-keys and much more. PairIp holds these values hardly encrypted in executable files in the apk's assets folder. At runtime, pairip replaces these strings in the apk so it can run. Before doing so, pairip checks the apk integrity to prevent modding and hooking though.

**3. Will this work for any app?**
Yes, it will work for any application using pairip latest update (open an issue if anything isnt working or if there is an update)



# How to start

You firstly have to install Bluestacks on your pc and download the desired app on it.
Once you done that, you can open the app and use it, because you didnt modify the apk yet.

Install Node js version v20.11.0
And install the frida npm package version frida@16.5.6
Make sure to use the same frida server version in the frida-server apk.

In the next steps you will hook the app on startup and extract the important strings.
You then replace these strings in the Apk and completly remove pairip. More on this now:


Firstly start the desired app on the emulator.
Then run the frida.js program, which will connect to your emulator (bluestacks) and checks if the app is running.
After the program ran, it will give you every fieldname and its classname and the string which is right for that.

To clarify, normally the apk holds static private fields like UGZGJKHDOIHJS without a value. PairIp will give these strings a value so the apk works.

After you extracted all required strings, you map them in a custom smali file with the program.py 
You then have the smali files which you can replace in the apk with the old ones.
Then just strip pairip and you are ready to go


# Important

In the frida.js you have to specify the application name and the classes which holds these random private static fields in the array.


# Any problems?
**Don't wait and open an issue here**


# Support
**I am more than greatful for every single tip which lets me put even more time into one-to-one support via discord and this project in general ♥️ If you want to tip, contact me on discord @mawocoder with your Github username or your wished alias or use this [PayPal](https://paypal.me/maxfourth)**
