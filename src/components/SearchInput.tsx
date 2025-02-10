import { memo } from 'react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSearch?: () => void
}

const SearchInput = memo(({ value, onChange, onSearch }: SearchInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch()
    }
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={handleKeyPress}
      placeholder="Rechercher des formations..."
      style={{
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #E2E8F0',
        margin: '8px'
      }}
    />
  )
})

SearchInput.displayName = 'SearchInput'

export default SearchInput