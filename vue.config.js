module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: 'http://localhost:8080'
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        "appId": "com.moeys.com",
        "productName": "Moeys",
        "protocols": {
          "name": "moeys",
          "schemes": [
            "moeys"
          ]
        },
        "copyright":"Copyright ©2022 Ministry of Education, Youth and Sport",
        "publish":{
          "provider":"github",
          "owner":"channvuthy271",
          "host":"github.com",
          "protocol":"https",
          "releaseType":"release",
        },
        "mac":{
          "target":["pkg"],
          "icon":"build/icons/mac/icon.icns"
        },
        "win": {
          "target": [
            {
              "target": "nsis",
              "arch": [
                "x64",
                "ia32"
              ]
            }
          ],
          "icon":"build/icons/win/icon.icns"
        },
      }
    }
  }
};
