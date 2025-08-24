document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const initialContent = document.getElementById('initial-content');
    const simulationContent = document.getElementById('simulation-content');
    const promptText = document.getElementById('prompt-text');
    
    //Function to handle search submission
    function handleSearch() {
        const prompt = searchInput.value.trim();
        
        if (prompt) {
            // Display the prompt in the simulation view
            promptText.textContent = prompt;
            
            // Save prompt to text file
            savePromptToFile(prompt);
            
            // Switch from initial view to simulation view
            initialContent.classList.add('hidden');
            simulationContent.classList.remove('hidden');
        }
    }
    
    // Function to save prompt to a text file
    function savePromptToFile(prompt) {
        // Create a Blob with the prompt text
        const blob = new Blob([prompt], { type: 'text/plain' });
        
        // Create a download link
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'simulation_prompt.txt';
        
        // Append to the body, click it, and remove it
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Release the object URL
        URL.revokeObjectURL(a.href);
    }
    
    // Event listeners
    searchButton.addEventListener('click', handleSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // New chat button functionality to reset the interface
    const newChatButton = document.querySelector('.new-chat');
    newChatButton.addEventListener('click', function() {
        // Clear the search input
        searchInput.value = '';
        
        // Switch back to initial view
        simulationContent.classList.add('hidden');
        initialContent.classList.remove('hidden');
    });
});