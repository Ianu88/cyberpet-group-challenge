document.addEventListener('DOMContentLoaded', () => {
    // Add typing effect to the title
    const title = document.getElementById('title');
    title.innerHTML = title.textContent.split('').map((char, i) =>
        `<span style="animation-delay: ${i * 0.1}s">${char}</span>`
    ).join('');
    
    // Handle image selection and switching to the second page
    document.querySelectorAll('.pet-selection img').forEach(img => {
        img.addEventListener('click', function() {
            // Remove 'selected' class from all images
            document.querySelectorAll('.pet-selection img').forEach(img => img.classList.remove('selected'));
            // Add 'selected' class to the clicked image
            this.classList.add('selected');
            
            // Play the associated pet sound
            const petSound = document.getElementById(`${this.id}-sound`);
            if (petSound) {
                petSound.play();
                setTimeout(() => {
                    petSound.pause(); // متوقف کردن صدا
                    petSound.currentTime = 0; // ریست کردن زمان صدا به ابتدا
                }, 2000);
            }
        });
    });
      
 
    // Handle "Make Pet" button click
    document.getElementById('make-pet').addEventListener('click', function() {
        const selectedPet = document.querySelector('.pet-selection img.selected');
        const petName = document.getElementById('pet-name').value;
        
        if (selectedPet && petName) {
            document.getElementById('page1').style.display = 'none';
            document.getElementById('page2').style.display = 'block';
    
            // Display selected pet name and image
            document.getElementById('pet-name-display').textContent = petName;
            document.getElementById('pet-image').src = selectedPet.src;
    
            // Reset stats
            document.getElementById('health').value = 100;
            document.getElementById('happy').value = 100;
            document.getElementById('thirsty').value = 50;
            document.getElementById('hunger').value = 50;
    
            // Add event listeners for actions
            document.getElementById('eat').addEventListener('click', function() {
                changeStat('hunger', -10);
                changeStat('happy', 5);
            });
    
            document.getElementById('drink').addEventListener('click', function() {
                changeStat('thirsty', -10);
            });
    
            document.getElementById('walk').addEventListener('click', function() {
                changeStat('health', 5);
                changeStat('happy', 10);
            });
    
            document.getElementById('play').addEventListener('click', function() {
                changeStat('happy', 10);
                changeStat('hunger', 5);
            });
        } else {
            alert('Please select a pet and enter a name.');
        }
    });
});
 
// Function to change the stat values
function changeStat(statId, change) {
    const stat = document.getElementById(statId);
    let currentValue = parseInt(stat.value,10);
    currentValue += change;
    if (currentValue > 100) currentValue = 100;
    if (currentValue < 0) currentValue = 0;
    stat.value = currentValue;
}