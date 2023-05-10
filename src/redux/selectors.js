export const selectAllIssues = state => state.active.issues;
export const selectOpenIssues = state => state.active.issues.open;
export const selectAssignedIssues = state => state.active.issues.assigned;
export const selectClosedIssues = state => state.active.issues.closed;

export const selectLoading = state => state.active.loading;
export const selectError = state => state.active.error;

export const selectCurrentOwner = state => state.active.current.owner;
export const selectCurrentRepo = state => state.active.current.repo;
export const selectCurrentStarCount = state => state.active.current.stars;