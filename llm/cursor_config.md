# Cursor Configuration

## Assistant Rules

1. **Planning Protocol**
   - Before implementing any change, outline the plan with steps
   - Consider potential challenges and alternatives
   - Present plan to user for approval

2. **Approval Workflow**
   - Clearly ask for permission to proceed with changes
   - Wait for explicit confirmation before writing/modifying code
   - If changes are rejected, refine the plan based on feedback

3. **Documentation Requirements**
   - Log all interactions in the appropriate log file
   - Include justification for each action
   - Record which model was used for each step

## Git Workflow Rules

1. **Branch Management**
   - Assign each task a feature name or appropriate branch name (feature/*, bugfix/*, etc.)
   - Always create and switch to a new branch before making code changes
   - Never commit directly to the development or main branch

2. **Code Implementation**
   - Make required code changes in the feature branch
   - Commit with clear, descriptive messages
   - Push changes to the remote repository

3. **Pull Request Process**
   - Create a pull request from the feature branch to the development branch
   - Document the PR link in the llm directory
   - Set up and perform a PR review
   - Provide justification for recommending merge or rejection
   - Wait for user approval before merging

4. **PR Review & Merging**
   - Present PR review results to the user
   - Offer options to accept or review further
   - If accepted, merge PR into the development branch
   - Document the merge action

## Logging System

1. **Organization**
   - Logs are organized by feature/branch in `llm/logs/[feature-name]/`
   - Files are named with date and feature: `YYYY-MM-DD-feature-name.txt`
   - Each log file contains all interactions for a single day's work on a feature

2. **Log Appending**
   - Use the `append_log.sh` script for efficient log entry creation
   - Basic usage: `./llm/append_log.sh [feature-name] "entry-type" "content"`
   - For actions: `./llm/append_log.sh [feature-name] "action" "description" "model" "justification"`

3. **Log Reviewing**
   - The script lists recent log files after each append
   - Logs are searchable by feature name and date
   - Content follows consistent formatting for easy reading

## Interaction Templates

### Plan Presentation
```
Here's my plan for [task]:

1. [Step 1]
2. [Step 2]
3. [Step 3]

Would you like me to proceed with this approach?
```

### Action Documentation (for logs)
```
action: [description of specific action]
justification: [reasoning behind the action]
model: [AI model used]
```

### Git Branch Creation
```
Feature/Task: [brief description]
Branch Name: [feature/name or bugfix/name]

I'll create this branch now before making any code changes.
```

### PR Review Template
```
## PR Review for [branch name]

**PR Link**: [URL to pull request]
**Changes**: [summary of changes]
**Testing**: [testing performed or recommended]
**Issues**: [any concerns or issues found]
**Recommendation**: [MERGE/NEEDS REVISION]
**Justification**: [reasoning for recommendation]

Would you like to approve this merge or review it further?
```

## Configuration Settings

- **Model**: Claude 3.7 Sonnet (default)
- **Workflow**: Plan → Approve → Implement → Branch → Code → PR → Review → Merge
- **Logging**: Feature-based logs in `llm/logs/[feature-name]/` directory
- **Git Target**: Development branch as integration target 