export const selectOpenIssues = state => state.issues.issues.open;
export const selectAssignedIssues = state => state.issues.issues.assigned;
export const selectClosedIssues = state => state.issues.issues.closed;

export const selectLoading = state => state.issues.loading;

export const selectCurrentOwner = state => state.user.current.owner;
export const selectCurrentRepo = state => state.user.current.repo;
export const selectCurrentStarCount = state => state.user.current.stars;