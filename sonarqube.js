const axios = require('axios');

// Function to retrieve project metrics from SonarQube
async function getProjectMetrics() {
    try {
        const token = 'sqa_ee03aecbd104f0d0a0f41e7c37128bb2d660cafe'; // Replace 'your_token' with the actual token value

        // Make a GET request to retrieve project metrics
        const response = await axios.get('http://localhost:9000/api/measures/component', {
            params: {
                component: 'your_component_key', // Replace with your project/component key
                metricKeys: 'maintainability_issues,reliability_issues,security_issues' // Specify the metrics you want to retrieve
            },
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        });

        // Parse and display the results
        const metrics = response.data.component.measures;
        console.log('Project Metrics:');
        console.log('Maintainability Issues:', metrics.find(metric => metric.metric === 'maintainability_issues').value);
        console.log('Reliability Issues:', metrics.find(metric => metric.metric === 'reliability_issues').value);
        console.log('Security Issues:', metrics.find(metric => metric.metric === 'security_issues').value);
    } catch (error) {
        console.error('Error retrieving project metrics:', error.message);
    }
}

// Call the function to retrieve project metrics
getProjectMetrics();

module.exports = getProjectMetrics;
