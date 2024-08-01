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
        let shadow = color?`${color} 0px 0px 2px, ${color} 0px 0px 5px, ${color} 0px 0px 10px, ${color} 0px 0px 20px, ${color} 0px 0px 30px, ${color} 0px 0px 40px, ${color} 0px 0px 55px, ${color} 0px 0px 65px, ${color} 0px 0px 75px, ${color} 0px 0px 95px, ${color} 0px 0px 120px`:`none`        
        
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

});
