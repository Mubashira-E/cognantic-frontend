
import React from 'react'
import type {WalletBalance  } from '../../../types'
interface WalletCardProps {
  wallet: WalletBalance | null
  isLoading: boolean
  showTopUp: boolean
  setShowTopUp: (v: boolean) => void
  topUpAmount: string
  setTopUpAmount: (v: string) => void
  topUpLoading: boolean
  handleTopUp: (method: string) => void
}

const WalletCard: React.FC<WalletCardProps> = ({
  wallet, isLoading,
  showTopUp, setShowTopUp,
  topUpAmount, setTopUpAmount,
  topUpLoading, handleTopUp,
}) => {
  if (isLoading) return (
    <div className="card" style={{ padding: '20px 32px', marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--n-400)', fontSize: 13 }}>
        <div style={{ width: 18, height: 18, border: '2px solid var(--n-200)', borderTopColor: 'var(--forest)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        Loading wallet…
      </div>
    </div>
  )

  return (
    <div className="card" style={{ padding: '28px 32px', marginBottom: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h4 style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.01em', marginBottom: 4 }}>Session Wallet</h4>
          <p style={{ fontSize: 12, color: 'var(--n-400)' }}>
            {wallet ? 'Live balance · Escrow held for upcoming sessions' : 'No wallet yet — add funds to create one'}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--n-400)', marginBottom: 4 }}>Available Balance</p>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 36, lineHeight: 1,
            color: wallet ? (wallet.available >= 0 ? 'var(--forest)' : 'var(--danger)') : 'var(--n-300)',
            fontWeight: 800,
          }}>
            ${wallet ? wallet.available.toFixed(2) : '0.00'}
          </p>
        </div>
      </div>

      {/* Balance pills */}
      {wallet && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Total',    value: `$${wallet.balance.toFixed(2)}`,       color: 'var(--charcoal)' },
            { label: 'Escrow',   value: `$${wallet.escrowBalance.toFixed(2)}`, color: 'var(--warning)'  },
            { label: 'Available',value: `$${wallet.available.toFixed(2)}`,     color: 'var(--forest)'   },
          ].map(k => (
            <div key={k.label} style={{ flex: 1, background: 'var(--n-50)', borderRadius: 14, padding: '12px 16px', border: '1px solid var(--n-100)' }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--n-400)', marginBottom: 4 }}>{k.label}</p>
              <p style={{ fontWeight: 800, fontSize: 17, color: k.color }}>{k.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Transactions from real backend (recentTransactions[]) */}
      {wallet && wallet.recentTransactions.length > 0 && (
        <div style={{ borderTop: '1px solid var(--n-100)', paddingTop: 16, marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--n-400)', marginBottom: 12 }}>
            Recent Transactions
          </p>
          {wallet.recentTransactions.slice(0, 5).map((t, i) => (
            <div key={t.transactionId ?? i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--n-50)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: t.direction === 'Credit' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                  {t.direction === 'Credit' ? '↑' : '↓'}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 1 }}>{t.description ?? t.transactionType}</div>
                  <div style={{ fontSize: 11, color: 'var(--n-400)' }}>
                    {new Date(t.createdTime).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
              <span style={{ fontWeight: 700, fontSize: 14, color: t.direction === 'Credit' ? 'var(--success)' : 'var(--danger)' }}>
                {t.direction === 'Credit' ? '+' : '−'}${t.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      {wallet && wallet.recentTransactions.length === 0 && (
        <p style={{ fontSize: 13, color: 'var(--n-400)', textAlign: 'center', padding: '12px 0', marginBottom: 16 }}>No transactions yet.</p>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowTopUp(!showTopUp)}>+ Add Funds</button>
        <button className="btn btn-forest" style={{ flex: 2, borderRadius: 18 }}>💳 Auto-Pay: Active</button>
      </div>

      {/* Inline top-up */}
      {showTopUp && (
        <div style={{ marginTop: 16, padding: 20, background: 'var(--n-50)', borderRadius: 16, border: '1px solid var(--n-100)' }}>
          <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Add Funds to Wallet</p>
          <input className="input" type="number" min="1" placeholder="Amount (e.g. 500)"
            value={topUpAmount} onChange={e => setTopUpAmount(e.target.value)}
            style={{ marginBottom: 10 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 10 }}>
            {['UPI', 'Card', 'NetBanking'].map(m => (
              <button key={m} className="btn btn-outline btn-sm"
                disabled={topUpLoading || !topUpAmount || Number(topUpAmount) <= 0}
                onClick={() => handleTopUp(m)}>
                {topUpLoading ? '…' : m}
              </button>
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'var(--n-400)' }}>🔒 Secured by 256-bit SSL. Cognantic never stores card details.</p>
        </div>
      )}
    </div>
  )
}

export default WalletCard
