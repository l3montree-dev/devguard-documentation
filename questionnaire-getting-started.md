## Basic Information

### 1. Tutorial Identification
- **Tutorial title**: Setup a fresh DevGuard Instance using docker-compose and scan your software for known cves
- **Brief description** (1-2 sentences): Scan your software for known vulnerabilities by setting up a DevGuard instance using docker-compose. This tutorial guides you through the installation, configuration, and scanning process step-by-step.
- **Target audience difficulty**: [x] Beginner [ ] Intermediate [ ] Advanced
- **Estimated completion time**: 15 minutes
- **Tutorial category**: 
  - [x] Basics
  - [ ] Vulnerability Management
  - [ ] CI/CD Integration
  - [ ] Compliance
  - [ ] Advanced

---

## Learning Objectives

### 2. What Will Users Learn?
List 3-5 specific learning outcomes:
1. How to set up a DevGuard instance using docker-compose
2. How to create a project and repository within DevGuard
3. How to use the devguard scanner to scan a software project for known vulnerabilities

### 3. What Will Users Build/Accomplish?
Describe the concrete end result (e.g., "A working CI/CD pipeline that automatically scans your Docker images"):

A fully functional DevGuard instance running via docker-compose, with a project and repository set up, and a successful vulnerability scan completed on a sample software project.

---

## Prerequisites

### 4. Required Knowledge
What should users know before starting?
- [x] Basic command line usage
- [x] Docker basics
- [ ] Git/GitHub familiarity
- [ ] API concepts
- [ ] Other: _______________________

### 5. Required Setup
What must users have installed or configured?
- [ ] DevGuard account
- [x] Docker installed
- [ ] Specific tools: _______________________
- [ ] Access/permissions: _______________________
- [ ] Other: _______________________

### 6. Links to Prerequisites
Provide links to prerequisite tutorials or guides:
1. Docker Installation: https://docs.docker.com/engine/install/
2. DevGuard GitHub Repository: https://github.com/l3montree-dev/devguard

---

## Tutorial Content

### 7. Step-by-Step Breakdown

For each major step, provide:

#### Step 1:
- **Step name/title**: 
Use docker-compose to set up a local DevGuard instance
- **What does this step accomplish?**:
Creates a working DevGuard instance using docker-compose for local testing and scanning.
- **Commands/code to execute**:
  ```bash
  # Paste commands here
  curl -LO https://raw.githubusercontent.com/l3montree-dev/devguard/refs/heads/main/docker-compose-try-it.yaml \
  && curl -LO https://raw.githubusercontent.com/l3montree-dev/devguard/refs/heads/main/initdb.sql \
  && curl -LO https://raw.githubusercontent.com/l3montree-dev/devguard/refs/heads/main/.kratos/identity.schema.json \
  && curl -L -o kratos.yml https://raw.githubusercontent.com/l3montree-dev/devguard/refs/heads/main/.kratos/kratos.example.yml \
  && mkdir -p kratos \
  && mv kratos.yml kratos/kratos.yml \
  && mv identity.schema.json kratos/identity.schema.json \
  && docker-compose -f docker-compose-try-it.yaml up
  ```
- **Expected output**:
  DevGuard services starting up and running without errors.
- **How to verify success**:
Web-Frontend runs on http://localhost:3000, API on http://localhost:8080, and Kratos (Authorization-Server) on http://localhost:4433.

#### Step 2:
- **Step name/title**:  Log into DevGuard Web-Frontend
You can do this by navigating to http://localhost:3000 in your web browser

#### Step 3:
- **Step name/title**: Create yourself an account
- Navigate to the registration http://localhost:3000/registration page and create a new user account
- Use any email (you won't need to verify it) and a password
- Press the Sign up button

![registration page screenshot](/getting-started/registration.png)

- **How to verify success**:
You should be redirected to the organization creation page.

- **Common issues at this step**:
- You do not have to verify your email. Just use the back button
- The local instance does not send emails until you configure an SMTP server


#### Step 4:
- **Step name/title**: Create an organization
- Choose a name for your organization (e.g., "MyOrg") and press the Create Organization button
![create organization screenshot](/getting-started/create-organization.png)

- **How to verify success**:
You should be redirected to the group overview page.
![organization overview screenshot](/getting-started/group-overview.png)


#### Step 5:
- **Step name/title**: Create a new group
- You should now be on the group overview page of your organization
- Groups are a way to organize projects within your organization
- It is possible to have an unlimited amount of groups in an organization
- Each group can contain subgroups and projects
- You can create releases on the group level and create dashboards to monitor the subgroups and their repositories security posture
- There are more features on the group level that you can explore later
- To create your first group, add a name and description for it and press the Create Group button. Those values can be changed later

- **How to verify success**:
- After group creation your should be redirected to the group overview page of the newly created group
![group overview screenshot](/getting-started/new-group-overview.png)

#### Step 6:
- **Step name/title**: Create a new repository
- Repositories are where your scanned software lives
- Each group can have an unlimited amount of repositories
- Press on the New Repository button on the group overview page to create your first repository
- Add a name and description for the repository
- Add a provider for the repository, currently GitLab or GitHub can be selected (can be changed later). DevGuard will use this information to better target any configuration options. DevGuard provides CI-CD Integration for both providers
- Press the Create Repository button to create the repository

![create repository screenshot](/getting-started/create-repository.png)

- **How to verify success**:
- After repository creation you should be redirected to the onboarding page of the newly created repository

#### Step 7:
- **Step name/title**: Open the risk scanning dialog by pressing the "Setup Risk Scanning" button
- For now we will use the Custom Setup since we are only trying to execute a single scan
- If you are using GitLab you can use the Auto Setup to automatically configure DevGuard CI-CD Integration for your repository
- Press on the "Custom Setup" button to open the custom setup dialog

![custom setup screenshot](/getting-started/custom-setup.png)


#### Step 8:
- **Step name/title**: Follow the instructions in the dialog
- The options are: 
    - CI/CD Integration using gitlab ci components or GitHub Actions
    - DevGuard CLI (which we will use now)
    - If you have your own scanner which produces SARIF Reports or SBOMs you can also upload those to DevGuard
    - If you have an external information source, like a VEX-URL from a vendor, you can also add that to DevGuard
- We will now use the DevGuard CLI to scan a sample project
- Install the devguard cli using docker or podman
    ```bash
    docker pull ghcr.io/l3montree-dev/devguard/devguard-scanner:latest
    ```
- Create a personal access token
    - This is needed for scanner -> devguard communication
    - The dialog should present you a button for this
- Copy the command from the dialog. It should automatically include your personal access token and the correct DevGuard API URL
    ```bash
    # Using docker
    docker run -v "$(PWD):/app" ghcr.io/l3montree-dev/devguard/scanner:main-latest \
    devguard-scanner sca \
        --path=/app \
        --assetName="myorg/projects/newgroup/assets/newrepository" \
        --apiUrl="https://api.main.devguard.org" \
        --token="0135..." \
        --webUI="https://main.devguard.org"
    ```
![devguard scanner command screenshot](/getting-started/devguard-cli.png)

- Run the command in your terminal in a folder containing some code you want to scan
```bash
> # Using docker
docker run -v "$(PWD):/app" ghcr.io/l3montree-dev/devguard/scanner:main-latest \
devguard-scanner sca \
    --path=/app \
    --assetName="myorg/projects/newgroup/assets/newrepository" \
    --apiUrl="https://api.main.devguard.org" \
    --token="d71ee2d1f60fbc3d3c88516844d589c029e51269fb444e6cb7f1ea134906293b" \
    --webUI="https://main.devguard.org"

11:48AM INF commands/sca.go:102 scanning directory dir=/app
11:49AM INF scanner/print.go:111 Scan completed successfully dependencyVulnAmount=7 openedByThisScan=7 closedByThisScan=0
+--------------------------------------------+----------------+------+------+---------------------+---------+--------+
| LIBRARY                                    | VULNERABILITY  | RISK | CVSS | INSTALLED           | FIXED   | STATUS |
+--------------------------------------------+----------------+------+------+---------------------+---------+--------+
| pkg:golang/github.com/aws/aws-sdk-go       | CVE-2020-8912  | 0.28 |  2.5 | 1.55.7              |         | open   |
| pkg:golang/github.com/docker/docker        | CVE-2025-54410 | 0.31 |  3.3 | 28.5.2+incompatible |         | open   |
| pkg:golang/golang.org/x/crypto             | CVE-2025-47914 | 0.49 |  5.3 | 0.44.0              | v0.45.0 | open   |
| pkg:golang/golang.org/x/crypto             | CVE-2025-58181 | 0.49 |  5.3 | 0.44.0              | v0.45.0 | open   |
| pkg:golang/github.com/dvsekhvalnov/jose2go | CVE-2025-63811 | 0.57 |  7.5 | 1.6.0               | v1.7.0  | open   |
| pkg:golang/github.com/aws/aws-sdk-go       | CVE-2020-8911  | 0.63 |  5.6 | 1.55.7              |         | open   |
| pkg:pypi/requests                          | CVE-2024-47081 | 1.22 |  5.3 | 2.32.3              | 2.32.4  | open   |
+--------------------------------------------+----------------+------+------+---------------------+---------+--------+
See all dependency risks at:
http://localhost:3000/myorg/projects/newgroup/assets/newrepository/refs/main/dependency-risks/
```

- **How to verify success**:
- Terminal output should show found vulnerabilities

### Step 9:
- **Step name/title**: View scan results in DevGuard Web-Frontend
- Go back to the DevGuard Web-Frontend in your browser
- Navigate to your repository (you can use the link printed in the terminal output)
- You should now see a summary of the scan results

![dependency-scan-result](/getting-started/dependency-scan-results.png)

### Step 10:
- **Step name/title**: Explore further
- You have now successfully set up a DevGuard instance, created an organization, group, and repository, and performed a vulnerability scan using the DevGuard CLI.
- Explore other features of DevGuard like setting up CI/CD integration, uploading SBOMs, and managing releases.
- You can have a look at the dashboard as well

![dashboard screenshot](/getting-started/dashboard.png)
---

## Multiple Options/Paths

### 9. Does This Tutorial Have Alternative Paths?
- [x] Yes - users can choose different tools/platforms
- [ ] No - single path only

If yes, describe the options:

**Option A**: 
- Name: CI/CD Integration
- When to choose: 
When users want to automate vulnerability scanning as part of their CI/CD pipeline using GitLab CI or GitHub Actions.
- Key differences:  Users will set up CI/CD configuration files instead of running manual scans with the DevGuard CLI. Scans will be triggered automatically on code changes.

**Option B**: 
- Name: Upload SARIF/SBOM
- When to choose: When users have existing SARIF reports or SBOMs from other tools and want to import them into DevGuard for analysis.
- Key differences: Users will focus on uploading files rather than performing scans, allowing integration with other security tools.

**Option C**:
- Name: External Information Source
- When to choose: When users receive vulnerability information from external vendors (e.g., VEX URLs) and want to incorporate that data into DevGuard.
- Key differences: Users will configure DevGuard to fetch and process external vulnerability data instead of scanning code directly. The data is periodically updated based on the external source.

**Option D**:
- Name: Manual Scan with DevGuard CLI
- When to choose: When users want to perform on-demand vulnerability scans of their codebase using the DevGuard CLI tool.
- Key differences: Users will run scans manually from their local environment, providing flexibility for ad-hoc assessments without CI/CD integration.

---

## Verification & Next Steps

### 10. Final Verification
How should users verify they completed the tutorial successfully?
- Success criteria 1: Dashboard shows the scanned repository with detected vulnerabilities
- Success criteria 2: Terminal output from the DevGuard CLI shows found vulnerabilities
- Success criteria 3: Users can navigate through the DevGuard Web-Frontend to view scan results and repository details

### 11. Expected Results
What should users see/have after completion?


### 12. Next Steps
Where should users go from here?
1. Understanding content structure in DevGuard: Learn about Deep Git-Integration
2. Explore CI/CD Integration: Set up automated scans using GitLab CI or GitHub Actions
3. Explore Vulnerability Management: Learn how to manage and remediate detected vulnerabilities in DevGuard

---

## Additional Context

### 13. Common Pitfalls
What mistakes do users commonly make?
1. API-URL Mismatch: Using incorrect API URLs in the DevGuard CLI command
2. Token Issues: Not generating or using a valid personal access token

---

## Related Content

### 17. Related Documentation
- **Related tutorials**: 
- **Related how-to guides**: 
- **Reference documentation**: 
- **Concept explanations**: 


---

## Tags & Metadata

### 19. Tags
List relevant tags (e.g., "docker", "github-actions", "sbom"):
- vulnerability-scanning
- dependency-analysis
- docker
- cli


## Instructions for Draft generation

When you receive this filled questionnaire, use it with the tutorial-template.mdx to:
1. Generate a complete, beginner-friendly tutorial following the Diataxis framework
2. Use clear, actionable language with proper MDX formatting
3. Include code blocks with syntax highlighting
4. Add callouts (info, warning, tip) where appropriate
5. Use Steps component for the main tutorial flow
6. Add Tabs component if multiple options are provided
7. Ensure all prerequisites are linked
8. Include verification steps after each major action
9. Add a "Next Steps" section at the end
10. Keep the tone encouraging and educational

## Universal Quality Standards

### Immediate Usability
- [ ] **Can users copy-paste code and run it immediately?** (Stripe pattern)
  - No placeholder variables like `YOUR_API_KEY` in main examples
  - Actual runnable commands provided
  - Environment-specific instructions included (Mac/Linux/Windows if relevant)

- [ ] **Is there a "quick win" in the first 5 minutes?** (Kubernetes pattern)
  - Users see results fast
  - First success happens early
  - Complex details deferred to later sections

- [ ] **Are there multiple entry points for different skill levels?** (Stripe pattern)
  - Quick start for experienced users
  - Detailed walkthrough for beginners
  - Clear navigation between both

### Code Examples

- [ ] **Do code examples show the COMPLETE context?** (GitHub API pattern)
  - Full curl commands with all headers
  - Complete request bodies (not just fragments)
  - Full response examples (not just schema)

- [ ] **Are examples provided in multiple formats?** (GitHub API pattern)
  - curl / CLI
  - Code library (JavaScript, Python, etc.)
  - UI screenshots where applicable

- [ ] **Do examples use realistic data?** (Avoid "foo", "bar", "test123")
  - Real-world naming conventions
  - Meaningful example values
  - Context that matches actual use cases

### Progressive Disclosure

- [ ] **Is there a clear "what happens next" explanation?** (Stripe pattern)
  - After each code block, explain what the system does
  - Show the flow: "When you run this command, the following happens: 1... 2... 3..."
  - Make the invisible visible

- [ ] **Do you show the "complete picture" before diving into details?** (Docker pattern)
  - Architecture diagram early
  - Overall flow explained first
  - Then drill into specifics

- [ ] **Are advanced/optional topics clearly marked and separated?** (Stripe pattern)
  - Optional sections labeled as such
  - Advanced content doesn't interrupt basic flow
  - Easy to skip and come back later

## Tutorial-Specific Quality

### Learning Flow
- [ ] **Do users build something REAL, not a toy example?** (Kubernetes pattern)
  - Actual production-relevant scenario
  - Not "Hello World" unless that's the explicit goal
  - Users can extend/adapt for their needs

- [ ] **Is there a testing/verification step after each major section?** (Stripe pattern)
  - "Let's verify this worked"
  - Clear success criteria
  - Troubleshooting for common failures

- [ ] **Does the tutorial show what success looks like?** (Visual proof)
  - Screenshots of expected output
  - Example responses
  - Clear indicators of completion

### Learning Outcomes
- [ ] **Are learning objectives measurable?** (Not "understand" but "create", "configure", "deploy")
  - Action verbs
  - Concrete outputs
  - Testable results
