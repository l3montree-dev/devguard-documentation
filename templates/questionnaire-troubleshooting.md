# Troubleshooting Documentation Questionnaire

Use this questionnaire to gather information for creating a troubleshooting guide. Fill out all sections and provide your questionnaire to an AI agent along with the troubleshooting-template.mdx to generate an initial draft.

---

## Basic Information

### 1. Problem Identification
- **Problem title**: (e.g., "Docker Compose Fails to Start")
- **Brief description** (1 sentence): 
- **Target difficulty**: [ ] Beginner [ ] Intermediate [ ] Advanced
- **Category**: 
  - [ ] Installation
  - [ ] Scanning
  - [ ] Integrations
  - [ ] Dependency Proxy
  - [ ] API Errors
  - [ ] Common Issues

---

## Problem Summary

### 2. Symptoms
What are the visible symptoms of this problem? List all:
1. 
2. 
3. 
4. 

### 3. Error Messages
What error messages do users typically see?

**Error Message 1**:
```


```

**Error Message 2**:
```


```

**Error Message 3**:
```


```

### 4. How Users Encounter This
What are users typically doing when they hit this issue?


### 5. Affected Versions
- **All versions**: [ ] Yes [ ] No
- **Specific versions**: 
- **Since version**: 
- **Fixed in version**: (if applicable)

### 6. Affected Environment
- **Operating System**: [ ] Linux [ ] macOS [ ] Windows [ ] All
- **Platform**: [ ] Docker [ ] Kubernetes [ ] Bare metal [ ] All
- **Other environment factors**: 

---

## Quick Checks

### 7. Most Common Cause
What's the #1 most likely cause?


### 8. Quick Checks
Provide 3-5 quick things users should check first:

#### Quick Check 1:
- **What to check**: 
- **Command/method**:
  ```bash
  
  ```
- **Expected result if this is the issue**:
  ```
  
  ```
- **What this indicates**: 

#### Quick Check 2:
- **What to check**: 
- **Command/method**:
  ```bash
  
  ```
- **Expected result if this is the issue**:
  ```
  
  ```
- **What this indicates**: 

#### Quick Check 3:
- **What to check**: 
- **Command/method**:
  ```bash
  
  ```
- **Expected result if this is the issue**:
  ```
  
  ```
- **What this indicates**: 

---

## Root Causes

### 9. Cause 1 - Most Common
- **Cause name**: 
- **Likelihood**: [ ] Very Common (⭐⭐⭐⭐⭐) [ ] Common (⭐⭐⭐⭐) [ ] Occasional (⭐⭐⭐) [ ] Rare (⭐⭐)
- **Description**: 
- **How to identify**:
  ```bash
  # Diagnostic command
  
  ```
- **Expected diagnostic output**:
  ```
  
  ```
- **Why this happens**: 
- **Who is affected**: 

#### Solution Steps:
1. **Step 1**:
   ```bash
   
   ```
   
2. **Step 2**:
   ```bash
   
   ```
   
3. **Verify fix**:
   ```bash
   
   ```
   Expected output:
   ```
   
   ```

---

### 10. Cause 2
- **Cause name**: 
- **Likelihood**: [ ] Very Common (⭐⭐⭐⭐⭐) [ ] Common (⭐⭐⭐⭐) [ ] Occasional (⭐⭐⭐) [ ] Rare (⭐⭐)
- **Description**: 
- **How to identify**:
  ```bash
  
  ```
- **Expected diagnostic output**:
  ```
  
  ```
- **Why this happens**: 
- **Who is affected**: 

#### Solution Steps:
1. **Step 1**:
   ```bash
   
   ```
   
2. **Step 2**:
   ```bash
   
   ```
   
3. **Verify fix**:
   ```bash
   
   ```

---

### 11. Cause 3
- **Cause name**: 
- **Likelihood**: [ ] Very Common (⭐⭐⭐⭐⭐) [ ] Common (⭐⭐⭐⭐) [ ] Occasional (⭐⭐⭐) [ ] Rare (⭐⭐)
- **Description**: 
- **How to identify**:
  ```bash
  
  ```
- **Expected diagnostic output**:
  ```
  
  ```
- **Why this happens**: 
- **Who is affected**: 

#### Solution Steps:
1. **Step 1**:
   ```bash
   
   ```
   
2. **Step 2**:
   ```bash
   
   ```
   
3. **Verify fix**:
   ```bash
   
   ```

---

[Add more causes as needed]

---

## Diagnostic Process

### 12. Systematic Diagnosis
Provide a step-by-step diagnostic workflow:

#### Diagnostic Step 1:
- **Check**: 
- **Command**:
  ```bash
  
  ```
- **If result shows X**: Go to [Cause 1]
- **If result shows Y**: Go to [Cause 2]
- **Otherwise**: Continue to next step

#### Diagnostic Step 2:
- **Check**: 
- **Command**:
  ```bash
  
  ```
- **If result shows X**: Go to [Cause 3]
- **If result shows Y**: Go to [Cause 4]
- **Otherwise**: Continue to next step

---

## Logs & Debugging

### 13. Where to Find Logs
- **Log location 1**: 
  ```bash
  # Command to view
  
  ```
  
- **Log location 2**: 
  ```bash
  # Command to view
  
  ```

### 14. What to Look For in Logs
Key log patterns or messages:

**Pattern 1**:
```
# Log message pattern

```
**Indicates**: 

**Pattern 2**:
```
# Log message pattern

```
**Indicates**: 

### 15. Enabling Debug Mode
How to enable more verbose logging:
```bash


```

---

## Workarounds

### 16. Temporary Workarounds
If a full fix isn't immediately available:

**Workaround 1**:
- **Description**: 
- **Steps**:
  ```bash
  
  ```
- **Limitations**: 

**Workaround 2**:
- **Description**: 
- **Steps**:
  ```bash
  
  ```
- **Limitations**: 

---

## Prevention

### 17. How to Prevent This Issue
What can users do to avoid this problem in the future?
1. 
2. 
3. 

### 18. Early Warning Signs
What indicators suggest this problem might occur?
1. 
2. 
3. 

---

## Advanced Troubleshooting

### 19. Advanced Diagnostic Commands
For complex cases:

```bash
# Advanced diagnostics




```

### 20. Debug Output Analysis
How to interpret debug output:


### 21. When to Escalate
When should users seek additional help?
- [ ] If none of these solutions work
- [ ] If data loss risk exists
- [ ] If error persists after X attempts
- [ ] If affecting production
- [ ] Other: _______________________

---

## Related Issues

### 22. Similar/Related Problems
Link to related troubleshooting guides:
1. 
2. 
3. 

### 23. Often Occurs With
What other issues commonly happen alongside this one?
1. 
2. 

---

## Known Issues

### 24. Is This a Known Bug?
- [ ] Yes - known issue
- [ ] No - configuration/usage issue
- [ ] Unknown

If yes:
- **Issue tracker link**: 
- **Planned fix version**: 
- **Workaround available**: [ ] Yes [ ] No

---

## Community Solutions

### 25. Community-Reported Solutions
Have users found other solutions?

**Solution 1**:
- **Source**: (forum link, GitHub issue, etc.)
- **Description**: 
- **Success rate**: [ ] High [ ] Medium [ ] Low

**Solution 2**:
- **Source**: 
- **Description**: 
- **Success rate**: [ ] High [ ] Medium [ ] Low

---

## Getting Help

### 26. Support Resources
Where to get additional help:
- **Documentation**: 
- **Community forum**: 
- **Issue tracker**: 
- **Support email**: 
- **Chat/Slack**: 

### 27. Information to Provide When Seeking Help
What information should users include in support requests?
1. 
2. 
3. 
4. 
5. 

**Collection command** (if applicable):
```bash
# Command to gather diagnostic info

```

---

## Tags & Metadata

### 28. Tags
List relevant tags:
- troubleshooting
- [problem-area]
- 
- 

### 29. Visual Aids
Helpful visuals:
- [ ] Screenshot of error
- [ ] Log output example
- [ ] Configuration file example
- [ ] Flowchart for diagnosis
- [ ] Other: _______________________

---

## Additional Notes

### 30. Platform-Specific Issues
Any platform-specific considerations?
- **Linux**: 
- **macOS**: 
- **Windows**: 

### 31. Version-Specific Notes
Important version differences:


### 32. Special Notes for AI Agent
Any other important context?


---

# Instructions for Draft generation

When you receive this filled questionnaire, use it with the troubleshooting-template.mdx to:
1. Generate a clear, solution-focused troubleshooting guide
2. Start with the most common causes first (ordered by likelihood)
3. Provide clear diagnostic steps to identify the root cause
4. Include complete, runnable commands for diagnostics and fixes
5. Use Steps component for solution procedures
6. Add callouts for important warnings and tips
7. Include log examples and what to look for
8. Show expected output at each verification step
9. Provide workarounds if permanent fixes aren't available
10. Link to related issues and documentation
11. Keep the tone helpful and supportive
12. Focus on getting users to a solution quickly

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

## Troubleshooting Quality

### Problem Identification
- [ ] **Are symptoms described from user perspective?** (Not just error codes)
  - What users see/experience
  - How it manifests
  - When it occurs

- [ ] **Do you include the EXACT error messages users will see?** 
  - Copy-pastable error text
  - Users can search/find it
  - Multiple variations if applicable

### Solution Steps
- [ ] **Are diagnostic steps before solutions?** 
  - How to verify what's wrong
  - Commands to check state
  - Before jumping to fixes

- [ ] **Are solutions ordered by likelihood?** 
  - Most common cause first
  - Quick checks before complex solutions
  - Explicit "if this, then try that" flow
