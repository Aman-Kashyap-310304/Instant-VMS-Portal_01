document.addEventListener('DOMContentLoaded', () => {
    const stageSubtitle = document.getElementById('stage-subtitle');
    const addCompanyLink = document.getElementById('add-company');
    const affiliationsContainer = document.getElementById('affiliations-container');
    const registerForm = document.getElementById('register-form');
    const footer = document.getElementById('register-footer');

    const stages = [
        { id: 'stage-1', title: 'Stage 1 of 4 – Personal & Company Details' },
        { id: 'stage-2', title: 'Stage 2 of 4 – Visit Details' },
        { id: 'stage-3', title: 'Stage 3 of 4 – ID Verification' },
        { id: 'stage-4', title: 'Stage 4 of 4 – Review & Confirm' },
        { id: 'stage-success', title: '' }
    ];

    let currentStage = 1;

    // Add Company Row
    addCompanyLink.addEventListener('click', () => {
        const row = document.createElement('div');
        row.className = 'company-row';
        row.innerHTML = `
      <div class="form-group">
        <input type="text" class="form-control comp-name" placeholder="Company Name" required>
      </div>
      <div class="form-group">
        <input type="text" class="form-control comp-desc" placeholder="Designation" required>
      </div>
      <button type="button" class="btn-remove-row">&times;</button>
    `;
        affiliationsContainer.appendChild(row);

        // Attach remove event
        row.querySelector('.btn-remove-row').addEventListener('click', function () {
            row.remove();
        });
    });

    // Attach remove to initial hidden remove buttons (if they existed, though first row has it hidden)
    // Let's just hide the remove button for the first row via CSS, or just let it be. 
    // Wait, the first row in HTML has a hidden remove button. If they want to remove it, they can't.

    // Validation function
    const validateStage = (stageNum) => {
        let isValid = true;
        const stageEl = document.getElementById(`stage-${stageNum}`);
        const inputs = stageEl.querySelectorAll('input[required], select[required]');

        inputs.forEach(input => {
            let isInputValid = true;
            if (!input.value.trim()) {
                isInputValid = false;
            } else if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isInputValid = false;
                }
            }

            const errorMsg = input.parentElement.querySelector('.error-msg');
            if (!isInputValid) {
                isValid = false;
                input.classList.add('error');
                if (errorMsg) errorMsg.style.display = 'block';
            } else {
                input.classList.remove('error');
                if (errorMsg) errorMsg.style.display = 'none';
            }
        });

        return isValid;
    };

    // Generate Summary
    const generateSummary = () => {
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const contactNum = document.getElementById('contactNum').value;
        const hostMeet = document.getElementById('hostMeet').value;
        const purpose = document.getElementById('purpose').value;
        const visitDateTime = document.getElementById('visitDateTime').value;
        const idType = document.getElementById('idType').value;
        const idNum = document.getElementById('idNum').value;

        const companies = Array.from(document.querySelectorAll('.company-row')).map(row => {
            const name = row.querySelector('.comp-name').value;
            const desc = row.querySelector('.comp-desc').value;
            if (name) return `${name} (${desc})`;
            return null;
        }).filter(Boolean).join(', ');

        const summaryContent = document.getElementById('summary-content');
        summaryContent.innerHTML = `
      <div class="summary-item"><span>Name:</span> ${fullName}</div>
      <div class="summary-item"><span>Email:</span> ${email}</div>
      <div class="summary-item"><span>Contact:</span> ${contactNum || 'N/A'}</div>
      <div class="summary-item"><span>Companies:</span> ${companies || 'N/A'}</div>
      <hr style="margin: 10px 0; border: 0; border-top: 1px solid #e5e7eb;">
      <div class="summary-item"><span>Host:</span> ${hostMeet}</div>
      <div class="summary-item"><span>Purpose:</span> ${purpose}</div>
      <div class="summary-item"><span>Date & Time:</span> ${new Date(visitDateTime).toLocaleString()}</div>
      <hr style="margin: 10px 0; border: 0; border-top: 1px solid #e5e7eb;">
      <div class="summary-item"><span>ID Type:</span> ${idType}</div>
      <div class="summary-item"><span>ID Number:</span> ${idNum}</div>
    `;
    };

    // Navigation Logic
    const goToStage = (targetStageNum) => {
        // Hide all
        stages.forEach(stage => {
            const el = document.getElementById(stage.id);
            if (el) el.classList.add('hidden');
        });

        // Show target
        const targetEl = document.getElementById(`stage-${targetStageNum}`);
        if (targetEl) targetEl.classList.remove('hidden');

        // Update Title
        const stageInfo = stages.find(s => s.id === `stage-${targetStageNum}`);
        if (stageSubtitle) {
            if (stageInfo && stageInfo.title) {
                stageSubtitle.textContent = stageInfo.title;
                stageSubtitle.style.display = 'block';
            } else {
                stageSubtitle.style.display = 'none';
            }
        }

        currentStage = targetStageNum;
    };

    // Next Buttons
    document.getElementById('btn-next-1').addEventListener('click', () => {
        if (validateStage(1)) goToStage(2);
    });
    document.getElementById('btn-next-2').addEventListener('click', () => {
        if (validateStage(2)) goToStage(3);
    });
    document.getElementById('btn-next-3').addEventListener('click', () => {
        if (validateStage(3)) {
            generateSummary();
            goToStage(4);
        }
    });

    // Back Buttons
    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = parseInt(e.target.getAttribute('data-target'));
            goToStage(target);
        });
    });

    // Submit Registration
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateStage(4)) {
            // Simulate submission success
            goToStage('success');
            footer.style.display = 'none';
        }
    });

    // Reset errors on input
    registerForm.addEventListener('input', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
            e.target.classList.remove('error');
            const errorMsg = e.target.parentElement.querySelector('.error-msg');
            if (errorMsg) errorMsg.style.display = 'none';
        }
    });
});
