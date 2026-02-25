// Alumni Search and Filter Functionality
function initAlumniSearch() {
    const searchInput = document.getElementById('alumni-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterAlumni(searchTerm);
    });
}

function filterAlumni(searchTerm) {
    const alumni = document.querySelectorAll('.alumni-item');
    
    alumni.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = '';
            item.classList.add('fade-in');
        } else {
            item.style.display = 'none';
        }
    });

    // Show "no results" message if needed
    updateNoResultsMessage();
}

function updateNoResultsMessage() {
    const alumni = document.querySelectorAll('.alumni-item');
    const visibleAlumni = Array.from(alumni).filter(item => item.style.display !== 'none');
    
    let noResultsMsg = document.getElementById('alumni-no-results');
    if (visibleAlumni.length === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'alumni-no-results';
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.textContent = 'No alumni found matching your search.';
            document.getElementById('members_alumni_phd')?.parentElement.appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// Filter alumni by category
function filterAlumniByCategory(category) {
    const alumni = document.querySelectorAll('.alumni-item');
    
    alumni.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = '';
            item.classList.add('fade-in');
        } else {
            item.style.display = 'none';
        }
    });
}

// Initialize on document ready
document.addEventListener('DOMContentLoaded', initAlumniSearch);
