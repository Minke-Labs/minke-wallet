./node_modules/.bin/rn-nodeify --install --hack 'crypto,buffer,react-native-randombytes,vm,stream,http,https,os,url,net,fs,process'
echo "✅ rn-nodeify packages hacked succesfully"

yarn patch-package
echo "✅ All patches applied"

npx jetify
echo "✅ Jetify"
