declare global {
  /**
   * ⚠️ FSD
   *
   * Its hack way to export redux infering types from @/app
   * and use it in @/shared/model/hooks.ts
   */

  type RootState = import('../src/app/redux/app-store').RootState;
  type AppDispatch = import('../src/app/redux/app-store').AppDispatch;
  type AppThunk = import('../src/app/redux/app-store').AppThunk;
}

export {};
