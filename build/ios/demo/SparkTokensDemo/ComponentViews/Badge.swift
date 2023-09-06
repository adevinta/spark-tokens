//
//  Badge.swift
//  SparkTokensDemo
//
//

import SwiftUI
import SparkTokens

struct Badge: View {
    
    enum BadgeType {
        case
        info,
        success,
        error,
        alert,
        none
        
        func getBackgroundColor() -> Color {
            switch self {
            case .info:
                return Color.brandFeedbackInfo
            case .success:
                return Color.brandFeedbackSuccess
            case .error:
                return Color.brandFeedbackError
            case .alert:
                return Color.brandFeedbackAlert
            case .none:
                return Color.brandFeedbackNeutral
            }
        }
        
        func getForegroundColor() -> Color {
            switch self {
            case .info:
                return Color.brandFeedbackOnInfo
            case .success:
                return Color.brandFeedbackOnSuccess
            case .error:
                return Color.brandFeedbackOnError
            case .alert:
                return Color.brandFeedbackOnAlert
            case .none:
                return Color.brandFeedbackOnNeutral
            }
        }
    }
    
    var text: String = ""
    var type: BadgeType = .none
    
    public var body: some View {
        HStack {
            Text(text).foregroundColor(type.getForegroundColor())
        }
        .padding(.vertical, Size.badgePaddingVertical)
        .padding(.horizontal, Size.badgePaddingHorizontal)
        .background(type.getBackgroundColor())
        .cornerRadius(Size.badgeBorderRadius)
    }
}

struct BadgesView: View {
    var body: some View {
        VStack(spacing: 10) {
            Badge(text: "default")
            Badge(text: "info", type: .info)
            Badge(text: "success", type: .success)
            Badge(text: "error", type: .error)
            Badge(text: "alert", type: .alert)
            
        }
        .navigationBarTitle("Badges")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.brandMainOnMain)
        .edgesIgnoringSafeArea(.all)
    }
}

struct Badge_Previews: PreviewProvider {
    static var previews: some View {
        BadgesView()
    }
}
