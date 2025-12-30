# How-To Guide Documentation Questionnaire

Use this questionnaire to gather information for creating a new how-to guide. Fill out all sections and provide your questionnaire to an AI agent along with the how-to-template.mdx to generate an initial draft.

---

## Basic Information

### 1. Guide Identification
- **Task/goal**: How to _______________________
- **Brief description** (1 sentence): 
- **Target difficulty**: [ ] Beginner [ ] Intermediate [ ] Advanced
- **Estimated time**: ___ minutes
- **Category**: 
  - [ ] Scanning
  - [ ] Vulnerability Management
  - [ ] Dependency Management
  - [ ] Integrations
  - [ ] Security
  - [ ] Compliance
  - [ ] API Usage
  - [ ] Administration

---

## Task Context

### 2. When Should Users Use This Guide?
Describe the specific use case or problem this solves:


### 3. What Is the End Goal?
What exact outcome will users achieve?


### 4. Who Is This For?
- [ ] Developers
- [ ] DevOps Engineers
- [ ] Security Teams
- [ ] Compliance Officers
- [ ] Administrators
- [ ] Other: _______________________

---

## Prerequisites

### 5. What Must Be Set Up First?
- [ ] DevGuard account
- [ ] Specific permissions/role: _______________________
- [ ] Integrations configured: _______________________
- [ ] Tools installed: _______________________
- [ ] Prior knowledge required: _______________________
- [ ] Other: _______________________

### 6. Links to Prerequisite Docs
1. 
2. 

---

## Quick Solution

### 7. One-Line Summary
For experienced users, provide the quickest solution (1-2 commands/steps):
```bash


```

### 8. Quick Context
When would you use this quick approach vs. the detailed steps?


---

## Detailed Steps

### 9. Step-by-Step Process

#### Step 1:
- **Action item/task**: 
- **What to do**:
- **Code/command**:
  ```bash
  
  ```
- **Configuration/settings**:
  ```yaml
  
  ```
- **Where in UI** (if applicable):
- **Expected result**:
- **Tips/best practices**:

#### Step 2:
- **Action item/task**: 
- **What to do**:
- **Code/command**:
  ```bash
  
  ```
- **Configuration/settings**:
  ```yaml
  
  ```
- **Where in UI** (if applicable):
- **Expected result**:
- **Tips/best practices**:

#### Step 3:
- **Action item/task**: 
- **What to do**:
- **Code/command**:
  ```bash
  
  ```
- **Configuration/settings**:
  ```yaml
  
  ```
- **Where in UI** (if applicable):
- **Expected result**:
- **Tips/best practices**:

#### [Add more steps as needed]

---

## Multiple Approaches

### 10. Are There Different Ways to Accomplish This Task?
- [ ] Yes - multiple methods available
- [ ] No - single method only

If yes, provide details for each:

#### Method A: CLI
- **When to use**: 
- **Command**:
  ```bash
  
  ```

#### Method B: API
- **When to use**: 
- **API call**:
  ```bash
  
  ```

#### Method C: Web UI
- **When to use**: 
- **Steps**:
  1. 
  2. 
  3. 

---

## Verification

### 11. How to Verify Success
What commands or checks confirm the task completed correctly?
```bash


```

### 12. Expected Success Output
What should users see?
```


```

---

## Options & Configuration

### 13. Common Options/Flags
| Option | Default | Description | When to use |
|--------|---------|-------------|-------------|
|        |         |             |             |
|        |         |             |             |
|        |         |             |             |

### 14. Advanced Configuration
Any advanced settings users might want to know about?


---

## Common Issues

### 15. What Could Go Wrong?
List potential issues and quick fixes:

**Issue 1**: 
**Solution**: 

**Issue 2**: 
**Solution**: 

**Issue 3**: 
**Solution**: 

---

## Best Practices

### 16. Recommendations
What are the recommended approaches or settings?
1. 
2. 
3. 

### 17. What to Avoid
Common mistakes or anti-patterns:
1. 
2. 
3. 

---

## Additional Context

### 18. Security Considerations
Any security implications users should know?


### 19. Performance Considerations
Any performance tips or limitations?


### 20. When NOT to Use This
Are there scenarios where users should use a different approach?


---

## Examples

### 21. Real-World Examples
Provide 1-3 real-world use cases:

**Example 1**:
- **Scenario**: 
- **Command/approach**:
  ```bash
  
  ```

**Example 2**:
- **Scenario**: 
- **Command/approach**:
  ```bash
  
  ```

---

## Related Content

### 22. Related Documentation
- **Related how-to guides**: 
- **Tutorials**: 
- **Reference docs**: 
- **Concept explanations**: 

### 23. Further Reading
Any additional resources?
1. 
2. 

---

## Tags & Metadata

### 24. Tags
List relevant tags:
- 
- 
- 

### 25. Visual Aids Needed
- [ ] Screenshots of UI steps
- [ ] Flowchart of decision points
- [ ] Configuration file example
- [ ] Terminal output example

---

## Additional Notes

### 26. Special Cases or Edge Cases
Any special scenarios to document?


### 27. Version-Specific Information
Does this apply to specific DevGuard versions?


---

# Instructions for initial Draft generation

When you receive this filled questionnaire, use it with the how-to-template.mdx to:
1. Generate a concise, task-focused guide following the Diataxis framework
2. Start with a quick solution for experienced users
3. Follow with detailed steps for those who need more guidance
4. Use clear, imperative language (do this, then do that)
5. Include verification steps
6. Add Tabs component if multiple approaches exist (CLI/API/UI)
7. Keep explanations minimal - focus on the task
8. Include practical examples
9. Add troubleshooting for common issues
10. Ensure code blocks have proper syntax highlighting

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


## How-To Guide Quality

### Task Clarity
- [ ] **Is the problem/goal stated upfront?** (Docker pattern)
  - "Use this when you need to..."
  - Real-world scenario described
  - Problem before solution

- [ ] **Is there a TL;DR for experienced users?** (Stripe pattern)
  - Quick solution at the top
  - Detailed explanation follows
  - Expert users can scan and leave

- [ ] **Do you show multiple approaches when they exist?** (Stripe tabs pattern)
  - CLI vs UI vs API
  - Different tools for same goal
  - Trade-offs explained

### Practical Details
- [ ] **Are there realistic examples, not just syntax?** (GitHub pattern)
  - Real use cases
  - Common scenarios covered
  - Edge cases mentioned
