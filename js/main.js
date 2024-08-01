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
        
        dragNeonText.style.textShadow = shadow
      }

      const mainInput = document.getElementById('main-text')

      mainInput.addEventListener('input', (e)=>{
        console.log(e.currentTarget.value)
        dragNeonText.firstElementChild.innerHTML = e.target.value
        if (e.currentTarget.value == "") {
            dragNeonText.firstElementChild.innerHTML = 'Ton Texte'
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
            dragNeonText.style.fontFamily = e.currentTarget.innerHTML
        })
      })

      selectHead.parentElement.addEventListener('click', (e)=>{
        console.log(1)
        e.currentTarget.closest('.font-select').classList.toggle('active')
    })
});
