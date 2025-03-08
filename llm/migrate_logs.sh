#!/bin/bash

# Script to migrate existing development.txt content to the new log structure
# This is a one-time migration script

# Ensure the logs directory exists
LOGS_DIR="llm/logs/historical"
mkdir -p "$LOGS_DIR"

# Date for the migration
MIGRATION_DATE=$(date +"%Y-%m-%d")

# Define migration log file
MIGRATION_LOG="$LOGS_DIR/$MIGRATION_DATE-historical-content.txt"

# Add header to the migration log
echo "# Historical Development Log (Migrated on $MIGRATION_DATE)" > "$MIGRATION_LOG"
echo "# Migrated from development.txt" >> "$MIGRATION_LOG"
echo "" >> "$MIGRATION_LOG"

# Append the entire development.txt content
if [ -f "development.txt" ]; then
  cat development.txt >> "$MIGRATION_LOG"
  echo "" >> "$MIGRATION_LOG"
  echo "# End of migrated content" >> "$MIGRATION_LOG"
  echo "" >> "$MIGRATION_LOG"
  echo "Historical content has been successfully migrated to $MIGRATION_LOG"
  
  # Create a backup of the original file
  cp development.txt development.txt.bak
  echo "Original development.txt backed up to development.txt.bak"
  
  # Add a note to the original file indicating migration
  echo "# MIGRATION NOTICE" > development.txt
  echo "# The contents of this file have been migrated to the new logging system." >> development.txt
  echo "# Historical logs can be found in: $MIGRATION_LOG" >> development.txt
  echo "# Please use the new logging script: ./llm/append_log.sh" >> development.txt
  
  echo "Migration complete. development.txt has been updated with migration notice."
else
  echo "Error: development.txt not found."
  exit 1
fi 