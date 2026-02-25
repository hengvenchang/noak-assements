class Doctor {
  /**
   * @param {string} name - Name of the doctor
   * @param {number} avgConsultationTime - Average time per patient in minutes
   */
  constructor(name, avgConsultationTime) {
    this.name = name;
    this.avgConsultationTime = avgConsultationTime;
    // Tracks when this specific doctor will next be free
    this.nextAvailableAt = 0; 
  }
}

/**
 * Calculates the estimated waiting time for a patient at a specific position.
 * @param {Doctor[]} doctors - Array of Doctor objects
 * @param {number} patientPosition - John's position (e.g., 11th)
 * @returns {number} Estimated waiting time in minutes
 */
function calculateWaitTime(doctors, patientPosition) {
  // 1. Validation: If John is 1st and a doctor is free, wait time is 0.
  if (patientPosition <= doctors.length) {
    return 0;
  }

  // 2. Initialize: All doctors start at time 0 (not seeing any patients)
  // We use an array to track when each doctor finishes their current "assignment"
  let doctorTimelines = doctors.map(doc => ({
    avgTime: doc.avgConsultationTime,
    currentTime: 0
  }));

  // 3. Simulate the queue for all patients ahead of John
  // We process patients from 1 up to (patientPosition - 1)
  const patientsAhead = patientPosition - 1;

  for (let i = 0; i < patientsAhead; i++) {
    // Find the doctor who will be free soonest
    // We sort by 'currentTime' to find the minimum
    doctorTimelines.sort((a, b) => a.currentTime - b.currentTime);

    // Assign the current patient to the doctor who finishes first
    // That doctor's timeline increases by their average consultation time
    doctorTimelines[0].currentTime += doctorTimelines[0].avgTime;
  }

  // 4. John's wait time is the time when the NEXT doctor becomes available
  // After processing all patients ahead, the "soonest" doctor is John's entry time
  doctorTimelines.sort((a, b) => a.currentTime - b.currentTime);
  
  return doctorTimelines[0].currentTime;
}

// --- Example Usage (Case Study 2) ---

const docA = new Doctor("Doctor A", 3);
const docB = new Doctor("Doctor B", 4);

const doctorsList = [docA, docB];
const johnsPosition = 11;

const waitTime = calculateWaitTime(doctorsList, johnsPosition);

console.log(`John's Position: ${johnsPosition}`);
console.log(`Estimated Wait Time: ${waitTime} minutes`);