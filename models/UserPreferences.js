import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
  type: String,
  label: String,
  placeholder: String,
  required: Boolean,
  options: [String],
  style: {
    width: String,
    height: String,
    backgroundColor: String,
    textColor: String,
    borderColor: String,
    borderRadius: String,
    fontSize: String
  }
});

const userPreferenceSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  theme: {
    primaryColor: { type: String, default: '#3B82F6' },
    secondaryColor: { type: String, default: '#6B7280' },
    backgroundColor: { type: String, default: '#FFFFFF' },
    textColor: { type: String, default: '#1F2937' },
    accentColor: { type: String, default: '#10B981' },
    darkMode: { type: Boolean, default: false },
    fontFamily: { type: String, default: 'Inter' },
    borderRadius: { type: String, default: '8px' },
    shadow: { type: String, default: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }
  },
  layout: {
    sidebarWidth: { type: String, default: '280px' },
    headerHeight: { type: String, default: '70px' },
    compactMode: { type: Boolean, default: false }
  },
  customComponents: [componentSchema],
  formFields: [componentSchema]
}, { 
  timestamps: true 
});

export default mongoose.model('UserPreference', userPreferenceSchema);