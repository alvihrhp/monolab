function FontTest() {
  return (
    <div className="p-8 space-y-6 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto">
      <div className="text-center border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-medium text-gray-900 mb-2">Gotham Rounded Font Test</h2>
        <p className="text-gray-600">Testing all available weights and styles</p>
      </div>
      
      <div className="space-y-4">
        {/* Light */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Light (300)</h3>
          <p style={{ fontFamily: 'Gotham Rounded', fontWeight: 300 }} className="text-xl text-gray-900">
            The quick brown fox jumps over the lazy dog
          </p>
          <p style={{ fontFamily: 'Gotham Rounded', fontWeight: 300, fontStyle: 'italic' }} className="text-xl text-gray-700">
            The quick brown fox jumps over the lazy dog (Italic)
          </p>
        </div>

        {/* Book (Regular) */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Book - Regular (400)</h3>
          <p style={{ fontFamily: 'Gotham Rounded', fontWeight: 400 }} className="text-xl text-gray-900">
            The quick brown fox jumps over the lazy dog
          </p>
          <p style={{ fontFamily: 'Gotham Rounded', fontWeight: 400, fontStyle: 'italic' }} className="text-xl text-gray-700">
            The quick brown fox jumps over the lazy dog (Italic)
          </p>
        </div>

        {/* Medium */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Medium (500)</h3>
          <p style={{ fontFamily: 'Gotham Rounded', fontWeight: 500 }} className="text-xl text-gray-900">
            The quick brown fox jumps over the lazy dog
          </p>
          <p style={{ fontFamily: 'Gotham Rounded', fontWeight: 500, fontStyle: 'italic' }} className="text-xl text-gray-700">
            The quick brown fox jumps over the lazy dog (Italic)
          </p>
        </div>

        {/* Bold */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Bold (700)</h3>
          <p style={{ fontFamily: 'Gotham Rounded', fontWeight: 700 }} className="text-xl text-gray-900">
            The quick brown fox jumps over the lazy dog
          </p>
          <p style={{ fontFamily: 'Gotham Rounded', fontWeight: 700, fontStyle: 'italic' }} className="text-xl text-gray-700">
            The quick brown fox jumps over the lazy dog (Italic)
          </p>
        </div>
      </div>

      {/* CSS Classes Test */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Using CSS Classes</h3>
        <div className="space-y-2">
          <p className="font-gotham font-light text-lg">Gotham Rounded Light</p>
          <p className="font-gotham text-lg">Gotham Rounded Regular</p>
          <p className="font-gotham font-medium text-lg">Gotham Rounded Medium</p>
          <p className="font-gotham font-bold text-lg">Gotham Rounded Bold</p>
        </div>
      </div>
    </div>
  );
}

export default FontTest; 