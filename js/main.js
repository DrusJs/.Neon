document.addEventListener('DOMContentLoaded', () => {
    const neonSwitcher = document.querySelector('.neon-switcher')

    neonSwitcher.addEventListener('click', (e)=>{
        e.currentTarget.classList.toggle('active')
        if (e.currentTarget.classList.contains('active')) {
            setShadow(shadowColor)
        } else {
            setShadow()
        }
    })

    const neonWrapper = document.querySelector('.neon-wrapper')
    const dragNeonText = document.querySelector('.neon-signboard')
    let shadowColor = '#4A00E9'

    dragNeonText.onmousedown = function(event) {      
        moveAt(event.pageX - 200, event.pageY - 200);
      
        function moveAt(pageX, pageY) {
            dragNeonText.style.left = pageX  + 'px';
            dragNeonText.style.top = pageY  + 'px';
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX - 200, event.pageY - 200);
        }
      
        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            dragNeonText.onmouseup = null;
          };
      
      };

      function setShadow(color = '') {
        let shadow = color?`${color} 0px 0px 40px, ${color} 0px 0px 55px`:`none`        
        
        dragNeonText.firstElementChild.style.textShadow = shadow
      }

      const mainInput = document.getElementById('main-text')
      const widthSize = document.querySelector('.size-indicator.bottom .size')
      const heightSize = document.querySelector('.size-indicator.right .size')

      mainInput.addEventListener('input', (e)=>{
        dragNeonText.firstElementChild.innerHTML = e.target.value
        widthSize.firstElementChild.innerHTML = e.target.value.length*2
        if (e.currentTarget.value == "") {
            dragNeonText.firstElementChild.innerHTML = 'Ton Texte'
            dragNeonText.classList.remove('sizes')
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

            if (neonSwitcher.classList.contains('active')) {
                setShadow(shadowColor)
            }
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
        })
      })

      selectHead.parentElement.addEventListener('click', (e)=>{
        e.currentTarget.closest('.font-select').classList.toggle('active')
    })
});
