// styles/AppStyles.js
import {StyleSheet} from 'react-native';

const colors = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  white: '#ffffff',
  black: '#000000',
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
};

const borderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
};

const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
};

export const AppStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
    backgroundColor: colors.white,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },

  logoIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.gray[900],
  },

  headerSubtitle: {
    fontSize: fontSize.xs,
    color: colors.gray[500],
  },

  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },

  premiumText: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },

  // Progress Bar Styles
  progressContainer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },

  progressText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.gray[700],
  },

  progressCount: {
    fontSize: fontSize.sm,
    color: colors.gray[500],
  },

  progressBarContainer: {
    height: 8,
    backgroundColor: colors.gray[200],
    borderRadius: borderRadius.sm,
  },

  progressBar: {
    height: 8,
    backgroundColor: colors.success,
    borderRadius: borderRadius.sm,
  },

  // Tab Navigation Styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },

  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },

  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },

  tabText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.gray[500],
  },

  activeTabText: {
    color: colors.primary,
  },

  // Content Styles
  content: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  // List Styles
  addItemContainer: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },

  addItemInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    backgroundColor: colors.white,
  },

  addButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
    gap: spacing.md,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkedBox: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },

  itemContent: {
    flex: 1,
  },

  itemName: {
    fontSize: fontSize.md,
    fontWeight: '500',
    color: colors.gray[900],
  },

  completedItem: {
    textDecorationLine: 'line-through',
    color: colors.gray[500],
  },

  itemCategory: {
    fontSize: fontSize.xs,
    color: colors.gray[500],
    marginTop: 2,
  },

  // Recipe Container Styles
  recipeContainer: {
    padding: spacing.lg,
  },

  recipeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },

  recipeTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.gray[900],
  },

  recipeDescription: {
    fontSize: fontSize.sm,
    color: colors.gray[500],
    marginBottom: spacing.lg,
    lineHeight: 20,
  },

  recipeInput: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    height: 120,
    fontSize: fontSize.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.white,
    textAlignVertical: 'top',
  },

  // Button Styles
  magicButton: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing['2xl'],
  },

  magicButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },

  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },

  secondaryButton: {
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    color: colors.gray[700],
    fontSize: fontSize.md,
    fontWeight: '600',
  },

  // Success Message Styles
  successMessage: {
    backgroundColor: '#f0fdf4',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },

  successText: {
    color: '#166534',
    fontWeight: '500',
    fontSize: fontSize.sm,
  },

  // Premium Teaser Styles
  premiumTeaser: {
    backgroundColor: '#fef3c7',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#fbbf24',
  },

  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },

  premiumTeaserTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.gray[900],
  },

  featureList: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },

  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  featureText: {
    fontSize: fontSize.sm,
    color: colors.gray[700],
  },

  upgradeButton: {
    backgroundColor: colors.warning,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },

  upgradeButtonText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius['2xl'],
    margin: spacing.xl,
    maxHeight: '80%',
    width: '90%',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },

  premiumContent: {
    alignItems: 'center',
    padding: spacing['2xl'],
  },

  premiumIcon: {
    width: 80,
    height: 80,
    backgroundColor: colors.warning,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },

  premiumTitle: {
    fontSize: fontSize['3xl'],
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: spacing.sm,
    textAlign: 'center',
  },

  premiumSubtitle: {
    fontSize: fontSize.md,
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: spacing['3xl'],
    lineHeight: 22,
  },

  premiumFeatures: {
    gap: spacing.lg,
    marginBottom: spacing['3xl'],
    width: '100%',
  },

  premiumFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },

  premiumFeatureText: {
    fontSize: fontSize.md,
    color: colors.gray[700],
  },

  freeTrialButton: {
    backgroundColor: colors.warning,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing['3xl'],
    marginBottom: spacing.sm,
    width: '100%',
    alignItems: 'center',
  },

  freeTrialButtonText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },

  pricingText: {
    fontSize: fontSize.xs,
    color: colors.gray[500],
    textAlign: 'center',
  },

  // Usage Stats Styles
  usageStats: {
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },

  usageStatsText: {
    fontSize: fontSize.sm,
    color: colors.gray[600],
    textAlign: 'center',
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },

  loadingText: {
    fontSize: fontSize.md,
    color: colors.gray[600],
    marginTop: spacing.md,
  },

  // Error Styles
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#fecaca',
  },

  errorText: {
    color: '#dc2626',
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
});

// Export colors and spacing for use in components
export {colors, spacing, borderRadius, fontSize};

export default AppStyles;
