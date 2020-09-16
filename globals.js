componentWillMount(){
        var firebaseConfig = {
          apiKey: "AIzaSyBEDD5A3XF3gc4jZCeWaz1H5UsG0ISYfek",
          authDomain: "mxpertz-unga.firebaseapp.com",
          databaseURL: "https://mxpertz-unga.firebaseio.com",
          projectId: "mxpertz-unga",
          storageBucket: "mxpertz-unga.appspot.com",
          messagingSenderId: "949582116880",
          appId: "1:949582116880:web:785ff4d67721e3b516b295",
          measurementId: "G-3ZNHNB5T4V"
        };
      
      
        firebase.initializeApp(firebaseConfig);
      
        var ref = firebase.database().ref('/14/info');
      
        ref.on("value", function(snapshot) {




          var userItem = snapshot.val();

          global.number = '10';

        
      }, function (error) {
         console.log("Error: " + error.code);
      });
      
      }
