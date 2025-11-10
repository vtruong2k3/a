 const name = 'Quỳnh';

    const startBtn = document.getElementById('startBtn');
    const quiz = document.getElementById('quiz');
    const choices = document.querySelectorAll('.choice');
    const result = document.getElementById('result');
    const resultEmoji = document.getElementById('resultEmoji');
    const resultTitle = document.getElementById('resultTitle');
    const resultText = document.getElementById('resultText');
    const resetBtn = document.getElementById('resetBtn');
    const tryAgainBtn = document.getElementById('tryAgainBtn');
    const closeBtn = document.getElementById('closeBtn');

    const responses = {
      icecream: {
        emoji: '🍦',
        title: `${name} Thích ăn kem sao🍦`,
        text: 'Ăn kem béo đó kk 😂'
      },
      food: {
        emoji: '🐷',
        title: `${name} là "Heo ăn" chính hiệu! 🐷`,
        text: `Liu liu ${name}😂🍔`
      },
      matcha: {
        emoji: '🍵',
        title: `${name} là "Matcha Girl 🐷" trendy! 🍵✨`,
        text: `Ai được uống như ${name} đâu mà  📸💚`
      },
      shopping: {
        emoji: '💸',
        title: `Ai đại gia như ${name} đâu mà biết 🛍️💸`,
        text: ' 🛍️😭'
      },
      photo: {
        emoji: '📸',
        title: `${name} Xinh thì chụp gì chả đẹp 👑📸`,
        text: ' 🤳✨'
      },
      relax: {
        emoji: '🧖‍♀️',
        title: `${name} là "Self-care Queen"! 👑💆‍♀️`,
        text: 'Helthy qua đi cô nương 💅✨'
      }
    };

    startBtn.addEventListener('click', ()=>{
      quiz.style.display = 'block';
      startBtn.style.display = 'none';
      startBalloons();
      createSparkles();
    });

    choices.forEach(c => c.addEventListener('click', (e)=>{
      const choiceType = e.currentTarget.getAttribute('data-choice');
      showResult(choiceType);
    }));

    function showResult(type){
      const response = responses[type];
      quiz.style.display = 'none';
      result.style.display = 'flex';
      resultEmoji.textContent = response.emoji;
      resultTitle.textContent = response.title;
      resultText.textContent = response.text;
      createMoreSparkles();
    }

    resetBtn.addEventListener('click', ()=>{
      quiz.style.display = 'none';
      result.style.display = 'none';
      startBtn.style.display = 'inline-block';
      stopBalloons();
      clearSparkles();
    });

    tryAgainBtn.addEventListener('click', ()=>{
      result.style.display = 'none';
      quiz.style.display = 'block';
      createSparkles();
    });

    closeBtn.addEventListener('click', ()=>{
      result.style.display = 'none';
      quiz.style.display = 'block';
    });

    // --- Sparkle effects ---
    function createSparkles(){
      const sparkleContainer = document.getElementById('sparkle');
      const stars = ['✨', '⭐', '💫', '🌟', '💖'];
      
      for(let i = 0; i < 8; i++){
        setTimeout(() => {
          const star = document.createElement('div');
          star.className = 'star';
          star.textContent = stars[Math.floor(Math.random() * stars.length)];
          star.style.left = Math.random() * 100 + '%';
          star.style.top = Math.random() * 100 + '%';
          star.style.animationDelay = Math.random() * 0.5 + 's';
          sparkleContainer.appendChild(star);
          
          setTimeout(() => star.remove(), 2000);
        }, i * 100);
      }
    }

    function createMoreSparkles(){
      for(let i = 0; i < 3; i++){
        setTimeout(() => createSparkles(), i * 300);
      }
    }

    function clearSparkles(){
      document.getElementById('sparkle').innerHTML = '';
    }

    // --- Bóng bay bay lên ---
    let balloonInterval;
    function startBalloons(){
      const canvas = document.getElementById('balloons');
      const ctx = canvas.getContext('2d');
      
      function resize(){
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      const balloons = [];
      const colors = ['#ff69b4', '#ffb6d9', '#ff85c0', '#ffc8e3', '#ff9ed5'];
      
      for(let i=0; i<30; i++){
        balloons.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 300,
          vy: 1.2 + Math.random() * 1.8,
          size: 20 + Math.random() * 25,
          swing: Math.random() * Math.PI * 2,
          swingSpeed: 0.015 + Math.random() * 0.025,
          swingAmount: 12 + Math.random() * 18,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 20 - 10
        });
      }

      function drawBalloon(b){
        ctx.save();
        
        const swingX = Math.sin(b.swing) * b.swingAmount;
        
        // Bóng bay
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.ellipse(b.x + swingX, b.y, b.size * 0.7, b.size, b.rotation * Math.PI / 180, 0, Math.PI * 2);
        ctx.fill();
        
        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.ellipse(b.x + swingX - b.size * 0.2, b.y - b.size * 0.3, b.size * 0.2, b.size * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Dây
        ctx.strokeStyle = 'rgba(90, 40, 71, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(b.x + swingX, b.y + b.size);
        ctx.quadraticCurveTo(
          b.x + swingX + 8, 
          b.y + b.size + 25, 
          b.x + swingX + 3, 
          b.y + b.size + 50
        );
        ctx.stroke();
        
        ctx.restore();
      }

      function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for(const b of balloons){
          b.y -= b.vy;
          b.swing += b.swingSpeed;
          b.rotation += 0.1;
          
          if(b.y < -b.size - 60){
            b.y = canvas.height + 50;
            b.x = Math.random() * canvas.width;
          }
          
          drawBalloon(b);
        }
      }

      balloonInterval = setInterval(animate, 30);
    }

    function stopBalloons(){
      clearInterval(balloonInterval);
      const canvas = document.getElementById('balloons');
      const ctx = canvas.getContext('2d');
      if(ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }