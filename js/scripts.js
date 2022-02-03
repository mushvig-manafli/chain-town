
if(window.innerWidth > 800){
  window.onload = function() {
    var zoomTool = svgPanZoom('#town-map', {
        zoomEnabled: true,
        controlIconsEnabled: true,
        minZoom: 1,
        zoomScaleSensitivity: 0.5,
        mouseWheelZoomEnabled: false,
        onPan: function(){
          var townMapElement = document.getElementById("town-map");
          // $(townMapElement).find('g').css('opacity', 1);
          $('body').find('.info-modal').hide();
        },
        controlIconsEnabled: false
      });
   
    
    // document.getElementById('zoom-in').addEventListener('click', function(e){
    //   e.preventDefault()
  
    //   zoomTool.zoomIn()
    // });
  
    // document.getElementById('zoom-out').addEventListener('click', function(e){
    //   e.preventDefault()
  
    //   zoomTool.zoomOut()
    // });
  
    // document.getElementById('reset').addEventListener('click', function(e){
    //   e.preventDefault()
  
    //   zoomTool.resetZoom()
    // });
  };
}
else{
  var zoomTool = svgPanZoom('#town-map', {
    zoomEnabled: false,
    controlIconsEnabled: true,
    minZoom: 1,
    zoomScaleSensitivity: 0.5,
    mouseWheelZoomEnabled: false,
    onPan: function(){
      var townMapElement = document.getElementById("town-map");
      // $(townMapElement).find('g').css('opacity', 1);
      $('body').find('.info-modal').hide();
    }
  });
}


  


  var townMapElement = document.getElementById("town-map");

  townMapElement.addEventListener("load",function(){
      var svgDoc = townMapElement.contentDocument;
      var blankArray = [];
      myarray = ['MAPRT_1',
      'MAPRT_2','MAPRT_3','MAPRT_4','MAPRT_5','MAPRT_6','MAPRT_7','MAPRT_8','MAPRT_9','MAPRT_10','MAPRT_11','MAPRT_12','MAPRT_13','MAPRT_14','MAPRT_15','MAPRT_16','MAPRT_17','MAPRT_18',
      'saprt_1','saprt_2','saprt_3','saprt_4','saprt_5','saprt_6','saprt_7','saprt_8','saprt_9','saprt_10',
      'DR_x5F_6','DR_x5F_5','DR_x5F_4','DR_x5F_3','DR_x5F_2','DR_x5F_1',
      'PBT_x5F_1','PBT_x5F_2','PBT_x5F_3',
      'LT_x5F_1','LT_x5F_2','LT_x5F_3',
      'PREMIUM_TOWER', 'HOTEL'
    ];
      var saleNow = ["MAPRT_1"];
      var saleCodes = [
        "0x495f947276749ce646f68ac8c248420045cb7b5e/26986453282164274420927952591599186492422764839339430724883541423717449990145"
      ]
      $(svgDoc).on('click', 'svg', function(){
        blankArray = [];
      })
      setTimeout(() => {
        $(svgDoc).find('svg').removeClass('page-load-transition').addClass('drag-transition');
      }, 2000);




      $(svgDoc).on('click tap touchstart', 'g', function(){
          blankArray.push($(this).attr('id'));
          blankArray = blankArray.filter(function( element ) {
            return element !== undefined;
          });
          if(blankArray.length > 1) {
            if(jQuery.inArray(blankArray[0], myarray) != -1) {
                let build_id = '#' + blankArray[0];
                // $(svgDoc).find('g').css('opacity', 0.5);
                $(svgDoc).find('.svg-pan-zoom_viewport').css('opacity', 1);
                $(svgDoc).find(build_id).css('opacity', 1);
                $(svgDoc).find(build_id).find('g').css('opacity', 1);
                $(svgDoc).find(build_id).parent().css('opacity', 1);
                if(!saleNow.includes(blankArray[0])){
                  $('body').find('.build_name').text('Not sale');
                  
                  $('body').find('#permalink').hide();
                  $('body').find('.nickname').hide();
                }
                else{
                  
                  var saleCode = saleCodes[saleNow.indexOf(blankArray[0])];
                
                  fetch('https://api.opensea.io/api/v1/asset/'+saleCode,)
                  .then(response => response.json())
                  .then(data => {
                    $('body').find('.build_name').text(data["name"]);
                    $('body').find('.nickname').text('Owner: '+data["top_ownerships"][0].owner.user.username);
                    $('body').find('#permalink').attr("href",data["permalink"]);
                  });
                  $('body').find('#permalink').show();
                  $('body').find('.nickname').show();
                }
                // $('body').find('.build_name').text(blankArray[0]);
                // $('body').find('.build_name').text(homes["name"]);
                // $('body').find('#permalink').attr("href",homes["permalink"]);

                $('body').find('.info-modal').show();  
                $('body').find('.info-modal').removeClass('top');
                    

                // if(window.innerWidth <= 800){
                //   $('body').find('.info-modal').css({
                //     top: 100 ,
                //     left: 80
                //   });
                // }
                // else{
                //   $('body').find('.info-modal').css({
                //     top: window.innerHeight*1/2 ,
                //     left: window.innerWidth*1/2
                //   });
                // }
                if(window.innerWidth <= 800){
                  if(blankArray[0] == 'HOTEL' || blankArray[0] == 'PREMIUM_TOWER'){
                    $('body').find('.info-modal').css({
                      top: 100,
                      left: 20
                    });
                    
                  }
                  else{
                    $('body').find('.info-modal').css({
                      top: $(svgDoc).find(build_id).position().top,
                      left: $(svgDoc).find(build_id).position().left
                    });
                  }
                }
                else{
                  if(blankArray[0] == 'HOTEL' || blankArray[0] == 'PREMIUM_TOWER'){
                    if($(svgDoc).find(build_id).position().top > 0){
                        $('body').find('.info-modal').removeClass('top');
                        $('body').find('.info-modal').css({
                            top: $(svgDoc).find(build_id).position().top + 50,
                            left: $(svgDoc).find(build_id).position().left + 150 - ($('body').find('.info-modal').width() - 188)
                        })
                    } else {
                        $('body').find('.info-modal').addClass('top');
                        $('body').find('.info-modal').css({
                            top: 60,
                            left: $(svgDoc).find(build_id).position().left + 150 - ($('body').find('.info-modal').width() - 188)
                        })
                    }
                  } else {
                    if($(svgDoc).find(build_id).position().top > 0){
                      $('body').find('.info-modal').removeClass('top');
                      $('body').find('.info-modal').css({
                          top: $(svgDoc).find(build_id).position().top ,
                          left: $(svgDoc).find(build_id).position().left + 80 - ($('body').find('.info-modal').width() - 188)
                      })
                    } else {
                        $('body').find('.info-modal').addClass('top');
                        $('body').find('.info-modal').css({
                            top: 60,
                            left: $(svgDoc).find(build_id).position().left + 80 - ($('body').find('.info-modal').width() - 188)
                        })
                    }
                  }
                }
                    
                
              }
          } else {
            
            $(svgDoc).find('g').css('opacity', 1);
            $('body').find('.info-modal').hide();
          }
      })

      $(svgDoc).on('click tap touchstart', '.svg-pan-zoom-control', function(e){
          $(svgDoc).find('g').css('opacity', 1);
          $('body').find('.info-modal').hide();
        console.log(e)
      })
  }, false);


  //menu

  let state = 1;
  $('.show-hide-menu').click(function(){
    if(state ==0){
      $("#menu").animate({
        "right":"100%"
      });
      state = 1;
      $('.menu_hamburger').fadeIn();
      $('.menu_hamburger-x').hide();
    }
    else{
      state=0;
      $("#menu").animate({
        "right":"0px"
      });
      $('.menu_hamburger-x').fadeIn();
      $('.menu_hamburger').hide();
    }
  });



  // $.get('https://api.opensea.io/api/v1/assets?owner=0x3Ba9cA90Fe929f2dEe9c1580c21D625F288954a4&order_direction=desc&offset=0&limit=20',  // url
  //     function (data, textStatus, jqXHR) {  // success callback
  //       homes = data.assets;
  //       // console.log( data.assets[0]);
  // });



  // const getInfoHome = function(home_code){
  //   var result = [];
  //   // $.get('https://api.opensea.io/api/v1/asset/'+home_code,  // url
  //   //     function (data, textStatus, jqXHR) {  // success callback
  
  //   //       return data;
  //   // });

  //   fetch('https://api.opensea.io/api/v1/asset/'+home_code,)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data["name"])
  //     });
      
  //   }


  //wallet

  async function Connect(){
    await window.web3.currentProvider.enable();
    web3 = new Web3(window.web3.currentProvider);
  }

  const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
  getAccount();
});

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  showAccount.innerHTML = account.replace(/(.{7})..+/, "$1&hellip;");
  // let provider = ethers.getDefaultProvider();
  // const balance = await provider.getBalance('0x3Ba9cA90Fe929f2dEe9c1580c21D625F288954a4');
  // console.log(balance)
  // console.log(accounts)
}
