window.onload = function() {
    svgPanZoom('#town-map', {
      zoomEnabled: true,
      controlIconsEnabled: true
    });
  };


  var townMapElement = document.getElementById("town-map");

  townMapElement.addEventListener("load",function(){
      var svgDoc = townMapElement.contentDocument;
      myarray = ['MAPRT_1','MAPRT_2','MAPRT_3','MAPRT_4','MAPRT_5','MAPRT_6','MAPRT_7','MAPRT_8','MAPRT_9','MAPRT_10','MAPRT_11','MAPRT_12','MAPRT_13','MAPRT_14','MAPRT_15','MAPRT_16','MAPRT_17','MAPRT_18',
      'saprt_1','saprt_2','saprt_3','saprt_4','saprt_5','saprt_6','saprt_7','saprt_8','saprt_9','saprt_10',
      'DR_x5F_6','DR_x5F_5','DR_x5F_4','DR_x5F_3','DR_x5F_2','DR_x5F_1',
      'PBT_x5F_1','PBT_x5F_2','PBT_x5F_3',
      'LT_x5F_1','LT_x5F_2','LT_x5F_3',
      'PREMIUM_TOWER', 'HOTEL'];
      $(svgDoc).on('click', 'g', function(){
          if(jQuery.inArray($(this).attr('id'), myarray) != -1) {
              let build_id = '#' + $(this).attr('id');
              $(svgDoc).find('g').css('opacity', 0.5);
              $(svgDoc).find('.svg-pan-zoom_viewport').css('opacity', 1);
              $(svgDoc).find(build_id).css('opacity', 1);
              $(svgDoc).find(build_id).find('g').css('opacity', 1);
              $('body').find('.info-modal').css({
                  top: $(svgDoc).find(build_id).position().top-30,
                  left: $(svgDoc).find(build_id).position().left-30
                  
              })
              $('body').find('.build_name').text($(this).attr('id'));
              $('body').find('.info-modal').show();
          }
      })

      $(svgDoc).on('click', '.svg-pan-zoom-control', function(){
          $(svgDoc).find('g').css('opacity', 1);
          $('body').find('.info-modal').hide();
          
      })
  }, false);