'use client';

import { useActionState } from 'react';

import {
  updateAdminAccountAction,
  type AdminAccountState,
} from '@/app/admin/dashboard/settings/actions';

const inputClass =
  'w-full rounded-lg border border-navy/15 px-3.5 py-2.5 text-[14px] text-navy outline-none focus:border-navy';

const initialState: AdminAccountState = {};

export default function AdminAccountForm({ currentEmail }: { currentEmail: string }) {
  const [state, formAction, pending] = useActionState(updateAdminAccountAction, initialState);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
      <h2 className="mb-1 font-serif text-[19px] text-navy">Admin Account</h2>
      <p className="mb-5 text-[13px] text-muted">
        Change your admin login email and password
      </p>

      <form action={formAction} className="space-y-4">
        {state.error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
            {state.error}
          </div>
        )}
        {state.success && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-700">
            {state.success}
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-navy">
            New Email
          </label>
          <input
            name="newEmail"
            type="email"
            defaultValue={currentEmail}
            placeholder="admin@example.com"
            className={inputClass}
          />
          <p className="mt-1 text-[12px] text-muted">
            Leave unchanged to keep your current email
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-navy">
              New Password
            </label>
            <input
              name="newPassword"
              type="password"
              placeholder="••••••••"
              className={inputClass}
            />
            <p className="mt-1 text-[12px] text-muted">
              Leave blank to keep current password
            </p>
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-navy">
              Confirm New Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              className={inputClass}
            />
          </div>
        </div>

        <div className="border-t border-navy/10 pt-4">
          <label className="mb-1.5 block text-[13px] font-medium text-navy">
            Current Password <span className="text-red-500">*</span>
          </label>
          <input
            name="currentPassword"
            type="password"
            required
            placeholder="Enter your current password to confirm changes"
            className={`${inputClass} max-w-md`}
          />
          <p className="mt-1 text-[12px] text-muted">
            Required to verify your identity
          </p>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-navy px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-navy-deep disabled:opacity-50"
        >
          {pending ? 'Updating…' : 'Update Account'}
        </button>
      </form>
    </section>
  );
}
