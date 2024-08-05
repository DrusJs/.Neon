document.addEventListener('DOMContentLoaded', () => {
    const neonSwitcher = document.querySelector('.neon-switcher')


    function hexToRgb(rgbStr) {
        let hexArray = rgbStr.match(/\d+/g).map(Number);
        return `rgb(${hexArray[0]>25?hexArray[0]-40:hexArray[0]}, ${hexArray[1]>25?hexArray[1]-40:hexArray[1]}, ${hexArray[2]>25?hexArray[2]-40:hexArray[2]})`
    }

    neonSwitcher.addEventListener('click', (e)=>{
        e.currentTarget.classList.toggle('active')
        setShadow(shadowColor)
    })

    const neonWrapper = document.querySelector('.neon-wrapper')
    const neinAction = document.querySelector('.neon-action')
    const dragNeonText = document.querySelector('.neon-signboard')
    const deltaX = 20
    const deltaY = 50
    let shadowColor = 'rgb(140, 89, 255)'

    dragNeonText.onmousedown = function(event) {      
        
        let shiftX = event.clientX - dragNeonText.getBoundingClientRect().left + deltaX;
        let shiftY = event.clientY - dragNeonText.getBoundingClientRect().top + deltaY;

        moveAt(event.pageX, event.pageY);
      
        function moveAt(pageX, pageY) {
            if (pageX - shiftX + dragNeonText.firstElementChild.offsetWidth < neinAction.offsetWidth && pageX - shiftX > 0) {
              dragNeonText.style.left = pageX - shiftX  + 'px';
            }
            if (pageY - shiftY + 200 < neinAction.offsetHeight && pageY - shiftY > 40) {
              dragNeonText.style.top = pageY - shiftY  + 'px';
            }
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            dragNeonText.onmouseup = null;
          };
      
      };

      function setShadow(color) {
        let isShadow = neonSwitcher.classList.contains('active')
        
        let shadow = isShadow?`rgb(255, 255, 255) 0px 0px 2px, rgb(255, 255, 255) 0px 0px 5px, rgb(255, 255, 255) 0px 0px 10px, ${color} 0px 0px 20px, ${color} 0px 0px 30px, ${color} 0px 0px 40px, ${color} 0px 0px 55px, ${color} 0px 0px 65px, ${color} 0px 0px 75px, ${color} 0px 0px 95px, ${color} 0px 0px 120px`:`${hexToRgb(color)} 0px 1px 0px, ${hexToRgb(color)} 0px 2px 0px, ${hexToRgb(color)} 0px 3px 0px, ${hexToRgb(color)} 0px 4px 0px, rgba(0, 0, 0, 0.23) 0px 0px 5px, rgba(0, 0, 0, 0.43) 0px 1px 3px, rgba(0, 0, 0, 0.4) 1px 4px 6px, rgba(0, 0, 0, 0.38) 0px 5px 10px, rgba(0, 0, 0, 0.25) 3px 7px 12px`        

        dragNeonText.firstElementChild.style.textShadow = shadow
        dragNeonText.firstElementChild.style.color = isShadow?'#FFFFFF':color
      }

      function setLetterTotalPrice(size) {
        totlePrices.forEach(price=>{
          price.firstElementChild.innerHTML = 3.25 * size
        })
      }

      const mainInput = document.getElementById('main-text')
      const widthSize = document.querySelector('.size-indicator.bottom .size')
      const heightSize = document.querySelector('.size-indicator.right .size')
      const totlePrices = document.querySelectorAll('.js-total-price')

      mainInput.addEventListener('input', (e)=>{
        dragNeonText.firstElementChild.innerHTML = e.target.value
        widthSize.firstElementChild.innerHTML = e.target.value.length*2

        while (+dragNeonText.firstElementChild.offsetWidth + +dragNeonText.style.left.replace('px', '') > neinAction.offsetWidth) {
          dragNeonText.firstElementChild.style.fontSize = dragNeonText.firstElementChild.style.fontSize.replace('px', '') - 1 + 'px'
        }

        setLetterTotalPrice(e.target.value.length)
        if (e.currentTarget.value == "") {
            dragNeonText.firstElementChild.innerHTML = 'Ton Texte'
            dragNeonText.classList.remove('sizes')
            totlePrices.forEach(price=>{
              price.firstElementChild.innerHTML = '0.00'
            })
        } else {
            dragNeonText.classList.add('sizes')          
        }
      })

      const settingsGroups = document.querySelectorAll('.js-settings-group')

      settingsGroups.forEach(group => {
        let items = Array.from(group.children)
        items.forEach(el=>{
            el.addEventListener('click', (e)=>{
                if (!e.currentTarget.classList.contains('active')) {
                    group.querySelector('.active').classList.remove('active')
                    e.currentTarget.classList.add('active')
                }
            })
        })
      })

      const colorChange = document.querySelectorAll('.color-button')
      colorChange.forEach(btn => {
        btn.addEventListener('click', (e)=>{
            shadowColor = e.currentTarget.style.backgroundColor

            setShadow(shadowColor)
        })
      })

      const backgroundSwitcher = document.querySelectorAll('.background-item')

      backgroundSwitcher.forEach(el=>{
        el.addEventListener('click', (e)=>{
            neonWrapper.style.backgroundImage = `url(${e.currentTarget.firstElementChild.src})`
        })
      })

      const fontSelector = document.querySelectorAll('.select-dropdown-item')
      const selectHead = document.querySelector('.font-select-head span')

      fontSelector.forEach(el=>{
        el.addEventListener('click', (e)=>{
            selectHead.innerHTML = e.currentTarget.innerHTML
            selectHead.style.fontFamily = e.currentTarget.innerHTML
            selectHead.style.fontSize = Math.floor(+e.currentTarget.dataset.desk/2.5) + 'px'
            dragNeonText.firstElementChild.style.fontFamily = e.currentTarget.innerHTML
            dragNeonText.firstElementChild.style.fontSize = e.currentTarget.dataset.desk + 'px'

            while (+dragNeonText.firstElementChild.offsetWidth + +dragNeonText.style.left.replace('px', '') > neinAction.offsetWidth) {
              dragNeonText.firstElementChild.style.fontSize = dragNeonText.firstElementChild.style.fontSize.replace('px', '') - 1 + 'px'
            }
        })
      })

      selectHead.parentElement.addEventListener('click', (e)=>{
        e.currentTarget.closest('.font-select').classList.toggle('active')
    })

      const heightSwitcher = document.querySelectorAll('[data-height]')

      heightSwitcher.forEach(el=>{
        el.addEventListener('click', (e)=>{
          heightSize.firstElementChild.innerHTML = e.currentTarget.dataset.height
        })
      })

      window.addEventListener('resize', function(event) {
        if (window.matchMedia("(min-width: 1150px)").matches) {
          neonWrapper.style.backgroundImage = `url(img/background.png)`
        } else {
          neonWrapper.style.backgroundImage = `url(img/backgroundlandscape.jpg)`
        }
        
    }, true);
});
